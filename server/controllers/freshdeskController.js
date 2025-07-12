const User = require('../models/User');

//  Get all tickets from freshDesk
const getTickets = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { freshdeskKey, freshdeskDomain } = user;

    const response = await fetch(`https://${freshdeskDomain}/api/v2/tickets?include=requester`, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${freshdeskKey}:X`).toString('base64'),
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
        console.log(freshdeskDomain)
      return res.status(response.status).json({ error: data.message || 'Error fetching tickets' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error getting tickets', error: err.message });
  }
};

// Get ticket details and conversations
const getTicketDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);
    const { freshdeskKey, freshdeskDomain } = user;

    const ticketRes = await fetch(`https://${freshdeskDomain}/api/v2/tickets/${id}?include=requester`, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${freshdeskKey}:X`).toString('base64'),
      },
    });

    const ticket = await ticketRes.json();
    if (!ticketRes.ok) {
      return res.status(ticketRes.status).json({ error: ticket.message || 'Ticket not found' });
    }

    const convRes = await fetch(`https://${freshdeskDomain}/api/v2/tickets/${id}/conversations`, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${freshdeskKey}:X`).toString('base64'),
      },
    });

    const conversations = await convRes.json();
    if (!convRes.ok) {
      return res.status(convRes.status).json({ error: conversations.message || 'Error loading conversations' });
    }

    res.json({ ticket, conversations });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching ticket details', error: err.message });
  }
};

module.exports = {
  getTickets,
  getTicketDetails,
};
