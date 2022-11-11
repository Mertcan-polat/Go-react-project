package routes

import (
	"api/controllers"

	"github.com/gorilla/mux"
)

func UserRoute(router *mux.Router) {
    router.HandleFunc("/users/v1/create", controllers.CreateUser()).Methods("POST")
    router.HandleFunc("/users/v1/get/{userId}", controllers.GetAUser()).Methods("GET")
    router.HandleFunc("/users/v1/update/{userId}", controllers.EditAUser()).Methods("PUT")
    router.HandleFunc("/users/v1/delete/{userId}", controllers.DeleteAUser()).Methods("DELETE")
    router.HandleFunc("/users/v1/getAll", controllers.GetAllUser()).Methods("GET")
}