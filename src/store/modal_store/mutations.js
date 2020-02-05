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

export function showNewTeamModal (state) {
    state.new_team_modal = true
}
export function closeNewTeamModal (state) {
    state.new_team_modal = false
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
