const { getStatus, getStatuses } = require("./repository");

async function status(_, { id }) {
  const { data } = await getStatus(id);
  return data || null;
}

async function statuses(_, { skip, limit }) {
  const { data } = await getStatuses(skip, limit);
  return data || [];
}

module.exports = {
  Query: { status, statuses }
};
