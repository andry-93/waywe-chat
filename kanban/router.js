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
		// tasksList GRUD
		app.get(`${prefix}/tasksList`, callMethod(req => storage.getAllTasksList(req.query)));
		app.post(`${prefix}/tasksList`, callMethod(req => storage.insertTasksList(req.body)));
		app.delete(`${prefix}/tasksList/:id`, callMethod(req => storage.deleteTasksList(req.params.id)));
		app.put(`${prefix}/tasksList/:id`, callMethod(req => storage.updateTasksList(req.params.id, req.body)));

		// tasks GRUD
		app.get(`${prefix}/tasks`, callMethod(req => storage.getAllTask(req.query)));
		
		app.post(`${prefix}/tasks`, callMethod(req => storage.insertTask(req.body)));

		app.put(`${prefix}/tasks/:id`, callMethod(req => storage.updateTask(req.params.id, req.body)));

		app.delete(`${prefix}/tasks/:id`, callMethod(req => storage.delete(req.params.id)));
	}
};
