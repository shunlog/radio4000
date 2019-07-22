import Ember from 'ember';

const {Component, computed, get, inject} = Ember;

export default Component.extend({
	uiStates: inject.service(),
	player: inject.service(),
	session: inject.service(),
	tagName: 'aside',
	ariaRole: 'navigation',

	actions: {
		addTrack(trackModel) {
			get(this, 'onClick')(trackModel);
		},
		openShortcutsModal() {
			this.set('uiStates.showShortcutsModal', true)
		}
	}
});
