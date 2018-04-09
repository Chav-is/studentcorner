package main

import (
	"bytes"
	"html/template"
	"net/http"
	"path/filepath"
	"studentcorner.com/pkg/models"
	"time"
)

func humanDate(t time.Time) string {
	return t.Format("02 Jan 2018 at 15:04")
}

type HTMLData struct {
	Form interface{}
	Path string
	Project *models.Project
	Projects []*models.Project
}

func (app *App) RenderHTML(w http.ResponseWriter, r *http.Request, page string, data *HTMLData) {

	if data == nil {
		data = &HTMLData{}
	}

	data.Path = r.URL.Path

	files := []string{
		filepath.Join(app.HTMLDir, "base.html"),
		filepath.Join(app.HTMLDir, page),
	}

	fm := template.FuncMap{
		"humanDate" : humanDate,
	}

	ts, err := template.New("").Funcs(fm).ParseFiles(files...)
	if err != nil {
		app.ServerError(w, err)
		return
	}

	buf := new(bytes.Buffer)

	err = ts.ExecuteTemplate(buf, "base", data)
	if err != nil {
		app.ServerError(w, err)
	}
	buf.WriteTo(w)
}