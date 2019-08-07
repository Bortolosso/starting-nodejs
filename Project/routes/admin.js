//Routes for admin

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categorie");
const Categorie = mongoose.model("categories");
require("../models/Post");
const Post = mongoose.model("posts");

router.get("/", (req, res) => {
    res.render("admin/index");
});


router.get("/categories", (req, res) => {
    Categorie.find().sort({date: "desc"}).then((categorie) => {
        res.render("admin/categories", {categorie: categorie});
    }).catch((err) => {
        req.flash("erro_msg", "Houve um erro");
        res.redirect("/admin");
    });
});

router.get("/categories/add", (req, res) => {
    res.render("admin/addcategories")
});

router.post("/categories/add", (req, res) => {
    //Validates
        var error = [];

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

router.get("/categories/edit/:id", (req, res) => {
    Categorie.findOne({_id: req.params.id}).then((categorie) =>{
        res.render("admin/editcategorie", {categorie: categorie});
    }).catch((err) => {
        req.flash("error_msg", "Error in categorie !")
        res.redirect("/admin/categories")
    });
});

router.post("/categorie/edit", (req, res) =>{

    var error = [];

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
        error.push({text: "Invalid name !"}); //Todo array possui a função ".push" que serve para colocar um novo dado no array 
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        error.push({text: "Invalid slug !"}); 
    }

    if(error.length > 0){
        res.render("admin/addcategories", {error: error});
    }else{
        Categorie.findOne({_id: req.body.id}).then((categorie) =>{
        
            categorie.name = req.body.name;
            categorie.slug = req.body.slug;
    
            categorie.save().then(() =>{
                req.flash("success_msg", "Categoria editada com sucesso !");
                res.redirect("/admin/categories");
            }).catch((err) =>{
                req.flash("error_msg", "Houve um erro interno ao salvar a categoria !");
                res.redirect("/admin/categories");
            })
        }).catch((err) =>{
            req.flash("error_msg", "Houve um erro ao editar a categoria");
            res.redirect("/admin/categories")  
        });
    }
});

router.post("/categorie/delete", (req, res) => {
    Categorie.remove({_id:req.body.id}).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso !");
        res.redirect("/admin/categories");
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar a categoria !");
        res.redirect("/admin");
    });
});

router.get("/posts", (req, res) => {
    Post.find().populate("category").sort({data: "desc"}).then((post) => {
        res.render("admin/posts", {post: post});
    }).catch((err) => {
        console.log(err);
        req.flash("error_msg", "Houve um erro ao listar a postagem");
        res.redirect("/admin");
    });
});

router.get("/post/add", (req, res) => {
    Categorie.find().then((categorie) => {
        res.render("admin/addposts", {categorie: categorie});
    }).catch((err) => {
        req.flash("Houve um erro ao carregar formulario !");
        res.redirect("/admin");
    });
});

router.post("/posts/new", (req, res) => {
    var error = [];

    if(!req.body.tittle || typeof req.body.tittle == undefined || req.body.tittle == null){
        error.push({text: "Invalid tittle !"}); //Todo array possui a função ".push" que serve para colocar um novo dado no array 
    }

    if(!req.body.description || typeof req.body.description == undefined || req.body.description == null){
        error.push({text: "Invalid Description !"}); //Todo array possui a função ".push" que serve para colocar um novo dado no array 
    }


    if(req.body.categorie == "0"){
        error.push({text: "Categoria invalida, registre uma categoria"});
    }

    if(error.length > 0){
        res.render("admin/addposts", {error: error});
    }else{
        
        const newPost = {
            tittle: req.body.tittle,
            description: req.body.description,
            content: req.body.content,
            category: req.body.categories,
            slug: req.body.slug,
            date: req.body.date
        }

        new Post(newPost).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso !");
            res.redirect("/admin/posts");
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro durante o salvamento da postagem");
            res.redirect("/admin/posts");
        });
    }
});

router.get("/post/edit/:id", (req, res) => {
    Post.findOne({_id: req.params.id}).then((post) => {
        Categorie.find().then((categorie) => {
            res.render("admin/editpost", {categorie: categorie, post: post});
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao carregar categoria");
            res.redirect("/admin/posts");
        });
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar postagem");
        res.redirect("/admin/posts");
    });
});

router.post("/post/edit/", (req, res) => {
    Post.findOne({id: req.body.id}).then((post) => {

        post.tittle = req.body.tittle;
        post.description = req.body.description;
        post.content = req.body.content;
        post.category = req.body.categorie;
        post.slug = req.body.slug;
        post.date = req.body.date;

        post.save().then(() => {
            req.flash("success_msg", "Postagem editada com sucesso !");
            res.redirect("/admin/posts");
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao editar a postagem !");
        res.redirect("/admin/posts");
        });

    }).catch((err) => {
        console.log(err);
        req.flash("error_msg", "Houve um erro durante o salvamento da edição");
        res.redirect("/admin/posts");
    });

});

module.exports = router;