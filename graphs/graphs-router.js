const express = require('express');
const router = express.Router();

const Graphs = require('./graphs-model.js');

router.post('/', (req, res) => {
    const graph = req.body;

    Graphs.add(graph)
        .then((newGraph) => {
            res.status(201).json(newGraph)
        })
        .catch((err) => {
            res.status(500).json({message: "There was an error adding the graph to the database.", err})
        })
});

router.get('/', (req, res) => {

    Graphs.getAllGraphs()
        .then((graphs) => {
            res.status(200).json(graphs)
        })
        .catch((err) => {
            res.status(500).json({message: 'There was an error retrieving the graphs', err})
        })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    
    Graphs.findById(id)
        .then((graph) => {
            console.log(graph)
            res.status(200).json(graph)
        })
        .catch((err) => {
            res.status(500).json({message: 'There was an error retrieving the graph', err})
        })
});

router.put('/:id', (req, res) => {
    const updatedGraph = req.body;

    Graphs.updateGraph(req.params.id, updatedGraph)
        .then((graph) => {
            res.status(201).json(graph);
        })
        .catch(() => {
            res.status(500).json({message: 'There was an error updating the graph'})
        })
})

router.delete('/:id', (req, res) => {
    Graphs.deleteGraph(req.params.id)
        .then((deletedGraph) => {
            if(deletedGraph) {
                res.status(200).json({ message: 'The graph was successfully deleted'})
            } else {
                res.status(404).json({ message: 'A graph with that ID could not be found.'})
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
})

module.exports = router;