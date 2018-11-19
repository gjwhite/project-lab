module.exports = {
	title: 'project lab',
	description: 'project desc',
    src: 'src/components/',
    pattern: '**/[^_]*.{ejs,njk,hbs,twig}',
    url: (url) => '' + url,
    statuses: {
		wip: {
			label: 'WIP',
			description: 'Work in progress',
			color: '#fe913d'
		},
		pending: {
			label: 'Pending',
			description: 'Ready, but waiting for finalization',
			color: '#2d90e8'
		},
		ready: {
			label: 'Ready',
			description: 'Ready to implement',
			color: '#2bc052'
		}
	}
}
