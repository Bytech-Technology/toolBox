const express = require('express');
const routes = express.Router();
const path = require('path');
const fs = require('fs');


// =====================================================
// CARGAR HERRAMIENTAS
// =====================================================

const toolsPath = path.join(__dirname,"../", "data", "tools.json");
const toolsData = JSON.parse(fs.readFileSync(toolsPath, "utf-8"));


routes.get('/', (req, res) => {
    res.render('index', {
        app: toolsData.app,
        categories: toolsData.categories
    });
});



routes.get("/tools/:toolId", (req, res) => {

    const { toolId } = req.params;
    let tool = null;
    let category = null;


    for (const currentCategory of toolsData.categories) {

        const foundTool = currentCategory.tools.find(
            currentTool => currentTool.id === toolId
        );

        if (foundTool) {

            tool = foundTool;
            category = currentCategory;

            break;
        }
    }


    if (!tool) {
        return res.status(404).send("Herramienta no encontrada");
    }


    const specificView = path.join(__dirname, "views", "tools", `${tool.id}.ejs`);
    const view = fs.existsSync(specificView) ? `tools/${tool.id}` : "tools/tool";


    res.render(view, {
        app: toolsData.app,
        categories: toolsData.categories,
        tool,
        category
    });
});

module.exports = routes;