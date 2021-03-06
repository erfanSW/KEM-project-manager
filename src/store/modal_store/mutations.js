/*
export function someMutation (state) {
}
*/
export function showModal (state) {
    state.new_task_modal = true
}
export function closeModal (state) {
    state.new_task_modal = false
}

export function showNewProjectModal (state) {
    state.new_project_modal = true
}
export function closeNewProjectModal (state) {
    state.new_project_modal = false
}

export function open_status_modal (state) {
  state.new_status_modal = true
}

export function close_status_modal (state) {
  state.new_status_modal = false
}

export function viewTaskModal (state) {
  state.view_task_modal = true
}
export function closeTaskModal (state) {
  state.view_task_modal = false
}

export function viewProjectModal (state) {
  state.view_project_modal = true
}

export function closeViewProjectModal (state) {
  state.view_project_modal = false
}

