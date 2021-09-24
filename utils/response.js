const json = (res, countries) => {
    res.json({
        success: true,
        countries,
    });
};

const errorJson = (res, error, status = 500) => {
    res.status(status).json({
        success: false,
        error: `Something went wrong: ${error}`,
    });
};

module.exports = {
    json,
    errorJson
}