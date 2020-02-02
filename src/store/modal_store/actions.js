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
