//Routes for admin

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categorie");
const Categorie = mongoose.model("categories");

router.get("/", (req, res) => {
    res.render("admin/index");
});

router.get("/post", (req, res) => {
    res.send("Page of posts.");
});

router.get("/categories", (req, res) => {
    res.render("admin/categories");
});

router.get("/categories/add", (req, res) => {
    res.render("admin/addcategories")
})

router.post("/categories/add", (req, res) => {
    //Validates
        var error = []

        if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
            error.push({text: "Invalid name !"}); //Todo array possui a função ".push" que serve para colocar um novo dado no array 
        }

        if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
            error.push({text: "Invalid slug !"}); 
        }

        // if(!req.body.name.length < 2){
        //     error.push({text: "Invalid name !"});
        // }

        if(error.length > 0){
            res.render("admin/addcategories", {error: error});
        }else{
            const newCategorie = {
                name: req.body.name,
                slug: req.body.slug
            }
            new Categorie(newCategorie).save().then(() => {
                req.flash("success_msg", "Create whith success !");
                res.redirect("/admin/categories");
            }).catch((err) =>{
                req.flash("error_msg", "There was an error, try again !");
                res.redirect("/admin");
            });
        }
});

module.exports = router;