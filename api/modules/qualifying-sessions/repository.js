const database = require("../../database");
const {
  mapping,
  convert,
  convertBack,
  convertMany
} = require("../../services/convertor");

async function getQualifyingSession(id) {
  try {
    const where = convertBack({ id }, mapping.qualifySessions);
    const rawQualifyingSession = await database("qualifying")
      .where(where)
      .first();
    const qualifySession = convert(
      rawQualifyingSession,
      mapping.qualifySessions
    );
    return { data: qualifySession };
  } catch (error) {
    return { error };
  }
}

async function getQualifyingSessions(query = {}, skip = 0, limit = 100) {
  try {
    const where = convertBack(query, mapping.qualifySessions);
    const rawQualifyingSessions = await database("qualifying")
      .where(where)
      .modify(queryBuilder => {
        if (skip) queryBuilder.offset(skip);
        if (limit) queryBuilder.limit(limit);
      });
    const qualifySessions = convertMany(
      rawQualifyingSessions,
      mapping.qualifySessions
    );
    return { data: qualifySessions };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getQualifyingSession,
  getQualifyingSessions
};
