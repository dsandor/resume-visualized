'use strict';
/**
 * Created by dsandor on 8/6/16.
 * Builds out the nodes and links for the sankey chart from the base resume data file.
 */

const _          = require('lodash'),
      resumeData = require('../data/resume.data.json'),
      moment     = require('moment'),
      fs         = require('fs');

var sankey_data = {
    nodes: [],
    links: []
};

_.forEach(resumeData.tech_categories, (tc) => {
    sankey_data.nodes.push({name: tc});
});

_.forEach(resumeData.experience, (exp) => {
    sankey_data.nodes.push({name: exp.name});

    if (!exp.end)
        exp.end = moment().format('YYYY-MM-DD');

    exp.end = moment(exp.end);
    let weight = moment.duration(exp.end.diff(moment(exp.start))).asMonths();

    sankey_data.links.push({
        source: _.findIndex(sankey_data.nodes, (n) => n.name == exp.tech_category),
        target: _.findIndex(sankey_data.nodes, (n) => n.name == exp.name),
        value: weight
    });
    
});

_.forEach(resumeData.notable_projects, (np) => {
    sankey_data.nodes.push({ name: np.name });
    let proj_node_index = sankey_data.nodes.length-1;

    _.forEach(np.technologies, (t) => {
        sankey_data.links.push({
            source: _.findIndex(sankey_data.nodes, (n) => n.name == t.name),
            target: proj_node_index,
            value: t.weight
        });
    });
});

fs.writeFile("./work.json", JSON.stringify(sankey_data), () => {
    console.log('Wrote work.json');
});


