# Ejercicio 1

## Parte A – JavaScript y los cuatro componentes de Kuhn

1. **Generalización simbólica (reglas del lenguaje)**
   - JavaScript se basa en el estándar ECMAScript
   - Tiene reglas para declarar variables (`var`, `let`, `const`), usar estructuras de control como `if`, `else`, `for`, `while`.
   - Maneja tipos de datos como números, strings, boolean, null, undefined.
   - Se usan llaves `{}` para agrupar código y funciones.
   - En lo estructurado la idea es usar secuencias, decisiones y bucles, sin meter cosas más complejas.

2. **Creencias de los profesionales**
   - Es flexible y no necesita compilación.
   - Corre en navegadores y también en Node.js.
   - Aprenderlo no es difícil, la sintaxis se parece a C.
   - Tiene mucha comunidad y librerías.
   - Es muy usado para cosas web e interactivas.

---

## Parte B – Ejes para elegir el lenguaje

1. **Sintaxis y semántica**
   - Está bien definida en ECMAScript,
   - Hay documentación oficial y también MDN que se usa bastante.

2. **¿Se puede comprobar el código?**
   - Sí, se ejecuta en navegadores o Node.js
   - También hay herramientas como ESLint o Jest.

3. **¿Es confiable?**
   - En general sí porque se usa en todos lados,
   - aunque al ser tipado débil pueden aparecer errores en ejecución.

4. **¿Es ortogonal?**
   - No del todo. Ejemplo: `null` y `undefined` parecen similares pero no son iguales,
   - además la coerción de tipos es inconsistente (`"5" + 1` → `"51"`, `"5" - 1` → `4`).

5. **Consistencia y uniformidad**
   - Tiene base consistente (bloques con `{}`, punto y coma opcional),
   - aunque arrastra inconsistencias históricas por compatibilidad.

6. **¿Es extensible? ¿hay subconjuntos?**
   - Sí, con librerías y frameworks.
   - Hay supersets como TypeScript y subconjuntos como JSON.

7. **¿El código es transportable?**
   - Sí, funciona en distintos navegadores,
   - con Node también corre en servidores y otros entornos.

---
