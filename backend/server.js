import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import Tasks from './model/Tasks';

const app = express();
const router = express.Router();

/**
 * Database connection credentials
 */
const DATABASE_CONNECTION = "mongodb://127.0.0.1/tasks";

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(DATABASE_CONNECTION);
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongoose (MongoDB) database connection was created successfully!");
});

app.use('/api', router);
app.listen(4000, () => console.log(`Your Express server runs on the port 4000`));


/**
 * Rest API - Tasks
 */

router.route("/tasks").get((req, res) => {
    Tasks.find((err, tasks) => {
        if (err) {
            console.log(err);
        } else {
            res.json(tasks);
        }
    });
});

router.route("/task/:id").get((req, res) => {
    Tasks.findById(req.params.id, (err, task) => {
        if (err) {
            console.log(err);
        } else {
            res.json(task);
        }
    });
});

router.route('/task/add').post((req, res) => {
    let newTask = new Tasks(req.body);
    newTask.save()
        .then(task => {
            res.status(200).json("Task was added.");
        })
        .catch(err => {
            res.status(400).json("Error! Task could not be saved.");
            console.log(err);
        });
});


router.route('/task/update/:id').post((req, res) => {
    Tasks.findById(req.params.id, (err, task) => {
        if (!task)
            res.status(400).json("The task that should be updated was not found.");
        else {
            task.title = req.body.title;
            task.description = req.body.description;
            task.priority = req.body.priority;

            task.save().then(task => {
                res.status(200).json("Task was successfully updated.");
            }).catch(err => {
                res.status(400).json("Error! Task could not be updated.");
                console.log(err);
            });
        }
    });
});

router.route("/tasks/deleteall").get((req, res) => {
    Tasks.remove({}, (err) => {
        if (err) {
            res.status(400).json("Error. Tasks could not be deleted.");
            console.log(err);
        } else {
            res.status(200).json("Tasks were successfully deleted.");
        }
    });
});

router.route("/task/delete/:id").get((req, res) => {
    Tasks.findByIdAndRemove({ _id: req.params.id }, (err, task) => {
        if (err) {
            res.status(400).json("Error! Task could not be deleted.");
            console.log(err);
        } else {
            res.status(200).json("Task was successfully deleted.");
        }
    });
});
