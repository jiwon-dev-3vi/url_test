const services = require('../data/services.json');
const incidents = require('../data/incidents.json');

function listServices({ status, category }) {
  return services.filter(item => (!status || item.status === status) && (!category || item.category === category));
}

function getService(id) {
  return services.find(item => item.id === id);
}

function listIncidents(status) {
  return incidents.filter(item => !status || item.status === status);
}

function overview() {
  return {
    totalServices: services.length,
    operational: listServices({ status: 'operational' }).length,
    degraded: listServices({ status: 'degraded' }).length,
    activeIncidents: incidents.filter(item => item.status !== 'resolved').length
  };
}

module.exports = { listServices, getService, listIncidents, overview };
