/* eslint-disable */
require("date-format-lite"); // add date format
var xssFilters = require('xss-filters');

class KanbanStorage {
	constructor(connection) {
		this._db = connection;
		this.tasksTable = "tasks";
		this.tasksListTable = "tasksList";
	}

	// get events from the table, use dynamic loading if parameters sent
	async getAllTasksList(params) {
		let query = "SELECT * FROM ?? ";
		let queryParams = [
			this.tasksListTable
		];

		let result = await this._db.query(query, queryParams);

		result.forEach((entry) => {
			// format date and time
			entry.id = xssFilters.inHTMLData(entry.id);
			entry.title = xssFilters.inHTMLData(entry.title);
			entry.status = xssFilters.inHTMLData(entry.status);
		});

		return result;
	}

		// create new task
		async insertTasksList(data) {
			let sql = "INSERT INTO ?? " +
				"(`title`, `status`) " +
				"VALUES (?, ?)";
	
			const result = await this._db.query(
				sql,
				[
					this.tasksListTable,
					data.title,
					data.status
				]);
				return {
					action: "inserted",
					tid: result.insertId
				}
		}

		// delete event
	async deleteTasksList(id) {
		await this._db.query(
			"DELETE FROM ?? WHERE `id`=? ;",
			[this.tasksListTable, id]);

		return {
			action: "deleted"
		}
	}

		// update event
		async updateTasksList(id, data) {
			await this._db.query(
				"UPDATE ?? SET `title` = ?, `status` = ? WHERE id = ?",
				[this.tasksListTable, data.title, data.status, id]);
	
			return {
				action: "updated"
			}
		}



	// get events from the table, use dynamic loading if parameters sent
	async getAllTask(params) {
		let query = "SELECT * FROM ?? ";
		let queryParams = [
			this.tasksTable
		];

		let result = await this._db.query(query, queryParams);

		result.forEach((entry) => {
			// format date and time
			entry.id = xssFilters.inHTMLData(entry.id);
			entry.status = xssFilters.inHTMLData(entry.status);
			entry.text = xssFilters.inHTMLData(entry.text);
			entry.options = xssFilters.inHTMLData(entry.options);
		});

		return result;
	}

	// create new task
	async insertTask(data) {
		let sql = "INSERT INTO ?? " +
			"(`status`, `text`, `options`) " +
			"VALUES (?, ?, ?)";

		const result = await this._db.query(
			sql,
			[
				this.tasksTable,
				data.status,
				data.text,
				data.options
            ]);
            return {
                action: "inserted",
                tid: result.insertId
            }
	}
	
	// update event
	async updateTask(id, data) {
		await this._db.query(
			"UPDATE ?? SET `status` = ?, `text` = ?, `options` = ?  WHERE id = ?",
			[this.tasksTable, data.status, data.text, data.options, id]);

		return {
			action: "updated"
		}
	}
}

module.exports = KanbanStorage;
