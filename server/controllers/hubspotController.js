const User = require('../models/User');

const getContactByEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findById(req.userId);
    const hubspotToken = user.hubspotKey;

    if (!hubspotToken) {
      return res.status(400).json({ message: 'HubSpot token not found. Please connect your account.' });
    }

    const searchBody = {
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'email',
              operator: 'EQ',
              value: email
            }
          ]
        }
      ],
      properties: ['firstname', 'lastname', 'email', 'phone', 'lifecyclestage', 'company'],
      limit: 1
    };

    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${hubspotToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchBody),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'HubSpot API error' });
    }

    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ message: 'No matching contact found.' });
    }

    const contact = data.results[0].properties;

    res.json({
      name: `${contact.firstname || ''} ${contact.lastname || ''}`.trim(),
      email: contact.email,
      phone: contact.phone,
      lifecycleStage: contact.lifecyclestage,
      company: contact.company || '',
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contact from HubSpot', error: err.message });
  }
};

module.exports = {
  getContactByEmail,
};
