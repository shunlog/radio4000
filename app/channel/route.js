/* global document, window */
import Ember from 'ember';

const {Route, debug, warn} = Ember;

export default Route.extend({
	model(params) {
		return this.store.query('channel', {
			orderBy: 'slug',
			equalTo: params.slug
		}).then(data => data.get('firstObject'));
	},

	afterModel(model) {
		if (model) {
			document.title = `${model.get('title')} - Radio4000`;
		}
	},

	serialize(model) {
		if (!model) {
			// without this, it fails when you try to log in
			return;
		}
		// Because we use slugs instead of ids in the url
		// tell ember what the 'slug' param maps to on our model
		return {slug: model.get('slug')};
	},

	activate() {
		window.scrollTo(0, 0);
	},

	deactivate() {
		// Reset doc title when leaving the route
		document.title = 'Radio4000';
	},

	actions: {
		deleteTrack(track) {
			const flashMessages = Ember.get(this, 'flashMessages');
			track.get('channel').then(channel => {
				channel.get('tracks').then(tracks => {
					tracks.removeObject(track);
					channel.save();

					track.destroyRecord().then(() => {
						debug('Deleted track');
						flashMessages.warning('Deleted your track');
					}, () => {
						warn('Could not delete track');
					});
				});
			});
		}
	}
});
