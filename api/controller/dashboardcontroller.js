const Dashboard = require("../model/dashboardModel");

const getOptions = async (req, res) => {
  try {
    let data = await Dashboard.find();

    const listOfTopics = data.map((data) => data.topic).filter((d) => d != "");

    const listOfEndYears = data
      .map((data) => data.end_year)
      .filter((d) => d != "");

    const listOfSector = data.map((data) => data.sector).filter((d) => d != "");
    const listOfPestle = data.map((data) => data.pestle).filter((d) => d != "");
    const listOfSource = data.map((data) => data.source).filter((d) => d != "");
    const listOfCountry = data
      .map((data) => data.country)
      .filter((d) => d != "");

    const listOfRegion = data.map((data) => data.region).filter((d) => d != "");

    const topics = [...new Set(listOfTopics)].sort();
    const endYears = [...new Set(listOfEndYears)].sort();

    const sectors = [...new Set(listOfSector)];
    const pestles = [...new Set(listOfPestle)];
    const sources = [...new Set(listOfSource)];
    const countries = [...new Set(listOfCountry)];
    const regions = [...new Set(listOfRegion)];

    return res.status(200).json({
      topics,
      endYears,
      sectors,
      pestles,
      sources,
      countries,
      regions,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const filter = async (req, res) => {
  const { endyear, topic, sector, region, pest, source, swot, country, city } =
    req.query;

  try {
    if (endyear) {
      const data = await Dashboard.find(
        { end_year: endyear },
        "intensity sector likelihood insight relevance pestle start_year end_year topic country region"
      );

      return res.status(200).json(data);
    } else if (topic) {
      const data = await Dashboard.find(
        { topic: topic },
        "intensity sector likelihood insight relevance pestle start_year end_year topic country region"
      );

      return res.status(200).json(data);
    } else if (sector) {
      console.log(sector);
      const data = await Dashboard.aggregate([
        { $match: { sector } },
        {
          $group: {
            _id: null,
            totalIntensity: { $sum: "$intensity" },
            totalRelevance: { $sum: "$relevance" },
            totalLikelihood: { $sum: "$likelihood" },
          },
        },
      ]);
      console.log(data);
      return res.status(200).json(data);
    } else if (region) {
      const data = await Dashboard.find(
        { region: region },
        "intensity sector likelihood insight relevance pestle start_year end_year topic country region"
      );

      return res.status(200).json(data);
    } else if (pest) {
      const data = await Dashboard.find(
        { pestle: pest },
        "intensity sector likelihood insight relevance pestle start_year end_year topic country region"
      );

      return res.status(200).json(data);
    } else if (source) {
      const data = await Dashboard.find(
        { source: source },
        "intensity sector likelihood insight relevance pestle start_year end_year topic country region"
      );

      return res.status(200).json(data);
    } else {
      const data = await Dashboard.find(
        {},
        "intensity sector likelihood insight relevance pestle start_year end_year topic country region"
      );

      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getOptions,
  filter,
};
