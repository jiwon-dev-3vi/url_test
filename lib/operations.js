const tickets = require('../data/tickets.json');
const services = require('../data/services.json');
const incidents = require('../data/incidents.json');

function searchTickets(params) {
  const status = params.get('status');
  const query = (params.get('q') || '').trim().toLowerCase();
  return tickets.filter(ticket => (!status || ticket.status === status) &&
    (!query || [ticket.id, ticket.title, ticket.serviceId].some(value => value.toLowerCase().includes(query))));
}

function summarize() {
  return {
    totalServices: services.length,
    operational: services.filter(service => service.status === 'operational').length,
    activeIncidents: incidents.filter(incident => incident.status !== 'resolved').length,
    openTickets: tickets.filter(ticket => ticket.status !== 'resolved').length
  };
}

module.exports = { searchTickets, summarize };
