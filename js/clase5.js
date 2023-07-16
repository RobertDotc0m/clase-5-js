let Todo = [
  { id: 1, nombre: "desayunar", realizado: false },
  { id: 2, nombre: "hacer aseo", realizado: false },
  { id: 3, nombre: "hacer almuerzo", realizado: false },
  { id: 420, nombre: "fumetiar", realizado: false },
];

let nuevaTarea = document.querySelector("#agregaTuTarea");
let btn = document.querySelector("#agregarTarea");
let listaDeTareas = document.querySelector("#tareas");
let totalDeTareas = document.querySelector("#totalDeTareas");
let totalrealizadas = document.querySelector("#totalrealizadas");
let identificatuid = document.querySelector("#identificador");
let tareas = [];

actualiza();

btn.addEventListener("click", () => {
  if (nuevaTarea.value === "") {
    alert("Por favor ingresa una tarea");
    return;
  }
  let ultimoId = Todo[Todo.length - 1];
  let agregaTuTarea = {
    id: ultimoId ? ultimoId.id + 1 : 1,
    nombre: nuevaTarea.value,
    realizado: false,
  };
  Todo.push(agregaTuTarea);
  nuevaTarea.value = "";

  actualiza();
});

function borrarTarea(idtarea) {
  let index = tareas.findIndex((tarea) => tarea.id == idtarea);
  if (index !== -1) {
    tareas.splice(index, 1);
  } else {
    index = Todo.findIndex((tarea) => tarea.id == idtarea);
    if (index !== -1) {
      Todo.splice(index, 1);
    }
  }

  actualiza();
}

function actualiza() {
  let actualizarTareas = "";
  let idCounter = 1;
  let totalRealizadas = 0;

  for (const tarea of Todo.concat(tareas)) {
    const realizadoClass = tarea.realizado ? "realizado" : "";
    actualizarTareas += `<li class="${realizadoClass}" id="tarea-${idCounter}">id: ${
      tarea.id
    } - ${tarea.nombre} <button class='blue' onclick='borrarTarea(${
      tarea.id
    })'>x</button><input type="checkbox" ${
      tarea.realizado ? "checked" : ""
    } data-id="${tarea.id}"></li>`;
    idCounter++;
  }

  listaDeTareas.innerHTML = actualizarTareas;

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      const tareaId = parseInt(checkbox.getAttribute("data-id"));
      const tarea = Todo.find(
        (t) => t.id === tareaId || tareas.find((ta) => ta.id === tareaId)
      );

      if (tarea) {
        tarea.realizado = checkbox.checked;
        actualiza();
      }
    });
  });

  totalRealizadas = Todo.concat(tareas).filter(
    (tarea) => tarea.realizado
  ).length;
  totalrealizadas.textContent = `Realizadas: ${totalRealizadas}`;
  totalDeTareas.textContent = `Total de tareas: ${Todo.concat(tareas).length}`;
}
