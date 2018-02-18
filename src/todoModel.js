const Model = require('./model')

const uuid = () => {
  var i, random;
  var uuid = '';

  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
      .toString(16);
  }

  return uuid;
}

const TodoModel = (db) => {
  const { state, ...model } = Model(db)
  const { add, remove, update, subscribe } = model

  state.todos = []

  subscribe(() => {
    state.todos = db
      .query(e => true, { fullOp: true })
      .map(e => e.todo)
  })

  const addTodo = async (title) => {
    const todo = {
      id: uuid(),
      title: title,
      completed: false
    }

    await add(todo.id, { todo })
  }

  const toggle = async (todoToToggle) => {
    const todo = {
      ...todoToToggle,
      ...{completed: !todoToToggle.completed}
    }
    await add(todo.id, { todo })
  }

  const destroy = async (todo) => await remove(todo.id)

  const save = async (todoToSave, title) => {
    const todo = {
      ...todoToSave,
      ...{ title }
    }
    await update(todo.id, { todo })
  }

  const clearCompleted = () => {
    state.todos = state.todos.filter(function (todo) {
      return !todo.completed
    })
  }

  return {
    ...model,
    addTodo,
    toggle,
    destroy,
    save,
    clearCompleted
  }
}

module.exports = TodoModel
