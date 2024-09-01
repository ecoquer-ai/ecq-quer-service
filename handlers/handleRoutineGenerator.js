const handleRoutineGenerator = (functionArguments) => {
  const { imagesCategories } = functionArguments;

  console.log("handleRoutineGenerator: functionArguments", functionArguments);
  console.log("handleRoutineGenerator: imagesCategories", imagesCategories);

  let routine = [];

  let videoCategories = {
    parallelBars: {
      nivel1: ["nHRrW_JSru8"],
      nivel2: ["nHRrW_JSru8"],
      nivel3: ["nHRrW_JSru8"],
    },
    pullUpBars: {
      nivel1: ["m_A5NAMuctI"],
      nivel2: ["m_A5NAMuctI"],
      nivel3: ["m_A5NAMuctI"],
    },
    benchPress: {
      nivel1: ["i14IBMNQDQQ"],
      nivel2: ["i14IBMNQDQQ"],
      nivel3: ["i14IBMNQDQQ"],
    },
    legPress: {
      nivel1: ["q60f_akzYnM"],
      nivel2: ["q60f_akzYnM"],
      nivel3: ["q60f_akzYnM"],
    },
    gymParallelBars: {
      nivel1: ["lC7lLkjDZ_k"],
      nivel2: ["lC7lLkjDZ_k"],
      nivel3: ["lC7lLkjDZ_k"],
    },
  };

  let { parallelBars, pullUpBars, benchPress, legPress, gymParallelBars } =
    videoCategories;

  if (imagesCategories.length > 0) {
    imagesCategories.map((ic, i) => {
      const { categoryCode, category, path } = ic;

      console.log("categoryCode, category, path", categoryCode, category, path);

      // Barras Paralelas
      categoryCode === 1 &&
        routine.push({
          ...ic,
          description: `
            Calentamiento: 5 minutos de salto a la cuerda.
            Ejercicio Principal: Dips en barras paralelas - 3 series de 10 a 12 repeticiones.
            Ejercicio Secundario: Levantamiento de piernas - 3 series de 8 a 10 repeticiones.
            Enfriamiento: Estiramientos estáticos de brazos y hombros por 5 minutos.
          `,
          videoId:
            parallelBars.nivel1[
              Math.floor(Math.random() * parallelBars.nivel1.length)
            ],
          path,
        });

      // Barras de Dominadas
      categoryCode === 2 &&
        routine.push({
          ...ic,
          description: `
          Calentamiento: 5 minutos de jogging en el lugar.
          Ejercicio Principal: Dominadas con agarre pronado - 3 series de 8 a 10 repeticiones.
          Ejercicio Secundario: Dominadas con agarre supino - 3 series de 6 a 8 repeticiones.
          Enfriamiento: Estiramientos de espalda y bíceps por 5 minutos.
          `,
          videoId:
            pullUpBars.nivel1[
              Math.floor(Math.random() * pullUpBars.nivel1.length)
            ],
          path,
        });

      // Banco press de banca
      categoryCode === 3 &&
        routine.push({
          ...ic,
          description: `
          Calentamiento: 10 minutos de bicicleta estacionaria.
          Ejercicio Principal: Press de banca con barra - 4 series de 8 a 10 repeticiones.
          Ejercicio Secundario: Aperturas con mancuernas en banco plano - 3 series de 10 repeticiones.
          Enfriamiento: Estiramientos de pecho y hombros por 5 minutos.
          `,
          videoId:
            benchPress.nivel1[
              Math.floor(Math.random() * benchPress.nivel1.length)
            ],
          path,
        });

      // Prensa de piernas
      categoryCode === 4 &&
        routine.push({
          ...ic,
          description: `
          Calentamiento: 5 minutos de escaladora.
          Ejercicio Principal: Prensa de piernas - 3 series de 10 a 12 repeticiones.
          Ejercicio Secundario: Sentadillas con peso corporal - 3 series de 15 repeticiones.
          Enfriamiento: Estiramientos de piernas y glúteos por 5 minutos.
          `,
          videoId:
            legPress.nivel1[Math.floor(Math.random() * legPress.nivel1.length)],
          path,
        });

      // Paralelas de gimnasio
      categoryCode === 5 &&
        routine.push({
          ...ic,
          description: `
          Calentamiento: 5 minutos de marcha en el lugar con elevación de rodillas.
          Ejercicio Principal: Dips en paralelas - 3 series de 10 repeticiones.
          Ejercicio Secundario: Elevaciones de rodilla en paralelas - 3 series de 10 a 12 repeticiones.
          Enfriamiento: Estiramientos de brazos, hombros y abdomen por 5 minutos.
          `,
          videoId:
            gymParallelBars.nivel1[
              Math.floor(Math.random() * gymParallelBars.nivel1.length)
            ],
          path,
        });
    });
  }

  return {
    routine,
    assistantInstructions: `Se ha generado la rutina exitosamente`,
  };
};

module.exports = { handleRoutineGenerator };
