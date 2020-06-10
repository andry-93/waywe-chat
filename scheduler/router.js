/* eslint-disable */
function callMethod(method) {
	return async (req, res) => {
		let result;

		try {
			result = await method(req, res);
		}
		catch (e) {
			result = {
				action: "error",
				message: e.message
			};
		}

		res.send(result);
	};
}

module.exports = {
	setRoutes(app, prefix, storage) {
		app.get(`${prefix}`, callMethod(req => storage.getAll(req.query)));
		
		app.post(`${prefix}`, callMethod(req => storage.insert(req.body)));

		app.put(`${prefix}/:id`, callMethod(req => storage.update(req.params.id, req.body)));

		app.delete(`${prefix}/:id`, callMethod(req => storage.delete(req.params.id)));
	}
};
