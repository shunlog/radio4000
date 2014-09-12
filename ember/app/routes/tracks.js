import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		// we only want the tracks from the parent playlist route
		return this.modelFor('playlist').get('tracks');
	}
});
