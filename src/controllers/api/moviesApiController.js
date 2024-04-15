const db = require("../../database/models");

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;

const APISmoviesController = {
    'list': (req, res) => {
        db.Movie.findAll({
            include: ["genre"],
        }).then((movies) => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: movies.length,
                    url: "api/movies",
                },
                data: movies,
            };
            res.json(respuesta);
        });
    },

    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id, { include: ["genre"] }).then((movie) => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: movie,
                    url: "/api/movies/:id",
                },
                data: movie,
            };
            res.json(respuesta);
        });
    },
    create: (req, res) => {
        Movies.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id,
        })
            .then((confirm) => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "api/movies/create",
                        },
                        data: confirm,
                    };
                } else {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "api/movies/create",
                        },
                        data: confirm,
                    };
                }
                res.json(respuesta);
            })
            .catch((error) => res.send(error));
    },
    update: (req, res) => {
        let movieId = req.params.id;
        Movies.update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id,
            },
            {
                where: { id: movieId },
            }
        )
            .then((confirm) => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "api/movies/update/:id",
                        },
                        data: confirm,
                    };
                } else {
                    respuesta = {
                        meta: {
                            status: 204,
                            total: confirm.length,
                            url: "api/movies/update/:id",
                        },
                        data: confirm,
                    };
                }
                res.json(respuesta);
            })
            .catch((error) => res.send(error));
    },
    destroy: (req, res) => {
        let movieId = req.params.id;
        Movies
        .destroy({ where: { id: movieId }, force: true }) // force: true es para asegurar que se ejecute la acción
            .then((confirm) => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: "api/movies/destroy/:id",
                        },
                        data: confirm,
                    };
                } else {
                    respuesta = {
                        meta: {
                            status: 204,
                            total: confirm.length,
                            url: "api/movies/destroy/:id",
                        },
                        data: confirm,
                    };
                }
                res.json(respuesta);
            })
            .catch((error) => res.send(error));
    },
};

module.exports = APISmoviesController;
