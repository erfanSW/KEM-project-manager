/*
export function someAction (context) {
}
*/

export function showModal ({commit}) {
    commit("showModal")
}

export function closeModal ({commit}) {
    commit("closeModal")
}

export function showNewProjectModal ({commit}) {
    commit("showNewProjectModal")
}

export function closeNewProjectModal ({commit}) {
    commit("closeNewProjectModal")
}

export function showNewTeamModal ({commit}) {
    commit("showNewTeamModal")
}

export function closeNewTeamModal ({commit}) {
    commit("closeNewTeamModal")
}


export function viewTaskModal ({commit}) {
  commit("viewTaskModal")
}

export function closeTaskModal ({commit}) {
  commit("closeTaskModal")
}

export function viewProjectModal ({commit}) {
  commit("viewProjectModal")
}

export function closeViewProjectModal ({commit}) {
  commit("closeViewProjectModal")
}

export function open_status_modal ({commit}) {
  commit("open_status_modal")
}

export function close_status_modal ({commit}) {
  commit("close_status_modal")
}