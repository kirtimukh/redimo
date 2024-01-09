export const fakeActionGroups = {
    1: {
        'id': 1,
        'name': 'AG: Study',
        'description': 'Study routine for the week',
        'type': 'recurring',
        'tasks': [ // different collection of tasks for each task group
            {
                'id': 1,
                'name': 'Buy milk',
                'description': 'Go to the store and buy milk',
                'log': [],  // different collection of logs for each task
                'notes': 'Buy 2% milk',
                'completion': [],
            },
            {
                'id': 2,
                'name': 'Buy eggs',
                'description': 'Go to the store and buy eggs',
                'log': [],
                'notes': 'Buy 12 eggs',
                'completion': [],
            },
            {
                'id': 3,
                'name': 'Buy bread',
                'description': 'Go to the store and buy bread',
                'log': [],
                'notes': 'Buy whole wheat bread',
                'completion': [],
            }
        ]
    },
    2: {
        'id': 2,
        'name': 'AG: Project',
        'description': 'Updates of the project',
        'type': 'non-recurring',
        'tasks': [
            {
                'id': 4,
                'name': 'Make french toast',
                'description': 'Make french toast for breakfast',
                'notes': 'Use whole wheat bread', // optional, mutable
                'log': [],  // different collection of logs for each task, not mutable once day has passed
                'completion': true,
            },
            {
                'id': 5,
                'name': 'Make coffee',
                'description': 'Make coffee for breakfast',
                'notes': 'Use french press',
                'log': [],
                'completion': false,
            }
        ]
    },
    3: {
        'id': 3,
        'name': 'AG: Work',
        'description': 'Updates of the project',
        'type': 'changes daily',
        'tasks': [
            {
                'id': 6,
                'name': 'Eat breakfast',
                'description': 'Eat breakfast',
            }
        ]
    }
}