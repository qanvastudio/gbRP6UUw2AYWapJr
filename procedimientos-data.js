// Nombre y descripción breve por categoría, en el orden del catálogo.
const procedureCategories = [
  ['facial', 'Cirugía facial', [
    ['Rinoplastia', 'Explora una nueva armonía para tu nariz y tu rostro.'],
    ['Rinoseptumplastia', 'Conoce una opción que considera tu nariz y tu respiración.'],
    ['Blefaroplastia superior', 'Dale a tu mirada una apariencia más fresca y descansada.'],
    ['Blefaroplastia inferior', 'Descubre opciones para renovar la apariencia de tu mirada.'],
    ['Lifting facial', 'Redescubre los contornos de tu rostro con un enfoque personal.'],
    ['Lifting de cuello', 'Explora un contorno de cuello más definido y armonioso.'],
    ['Otoplastia', 'Busca un equilibrio entre tus orejas y las facciones de tu rostro.'],
    ['Bichectomía', 'Conoce opciones para dar mayor definición a tus mejillas.'],
    ['Mentoplastia', 'Explora cómo el mentón puede aportar equilibrio a tu perfil.'],
    ['Liposucción de papada', 'Descubre opciones para definir el contorno bajo tu mentón.'],
    ['Lipofilling facial', 'Explora una apariencia con más volumen y frescura.'],
    ['Lip lift', 'Explora una nueva armonía entre tus labios y tu sonrisa.'],
    ['Suspensión de cejas', 'Dale protagonismo a una mirada más abierta y expresiva.'],
    ['Cervicoplastia', 'Conoce alternativas para renovar la apariencia de tu cuello.']
  ]],
  ['mamaria', 'Cirugía mamaria', [
    ['Mamoplastia de aumento', 'Explora el volumen que mejor acompañe tus proporciones.'],
    ['Mamoplastia de reducción', 'Busca mayor comodidad y equilibrio para tu busto.'],
    ['Mastopexia (levantamiento de busto)', 'Descubre opciones para realzar la forma de tu busto.'],
    ['Mastopexia con implantes', 'Explora una combinación de volumen y realce para tu busto.'],
    ['Recambio de implantes mamarios', 'Revisa tus opciones para una nueva etapa de tu cuidado.'],
    ['Retiro de implantes mamarios', 'Conoce alternativas que acompañen tus preferencias actuales.'],
    ['Corrección de asimetría mamaria', 'Busca una mayor armonía entre las proporciones de tu busto.'],
    ['Reconstrucción mamaria', 'Explora un proceso de reconstrucción pensado para ti.'],
    ['Ginecomastia', 'Conoce opciones para un contorno de pecho más definido.'],
    ['Mastectomía por modelantes', 'Da el primer paso para valorar el cuidado de tu pecho.'],
    ['Mastectomía por masculinización', 'Explora un contorno de pecho acorde con tu identidad.']
  ]],
  ['corporal', 'Cirugía corporal', [
    ['Liposucción tradicional', 'Explora opciones para definir las zonas que deseas atender.'],
    ['Liposucción HD', 'Conoce un enfoque que busca destacar los contornos de tu cuerpo.'],
    ['Liposucción circunferencial 360°', 'Descubre una visión integral del contorno de tu cintura.'],
    ['Lipoescultura', 'Explora una silueta en armonía con tus proporciones.'],
    ['Lipotransferencia glútea', 'Conoce opciones para realzar la forma de tus glúteos.'],
    ['Abdominoplastia', 'Descubre alternativas para redefinir el contorno de tu abdomen.'],
    ['Miniabdominoplastia', 'Explora una atención enfocada en la parte baja de tu abdomen.'],
    ['Mommy Makeover', 'Un enfoque personal para los cambios de tu cuerpo tras la maternidad.'],
    ['Braquioplastia (brazos)', 'Conoce opciones para renovar el contorno de tus brazos.'],
    ['Cruroplastia (muslos)', 'Explora una mayor definición en el contorno de tus muslos.'],
    ['Lifting corporal', 'Descubre una atención integral para los cambios de tu silueta.'],
    ['Resección de exceso de piel o paniculectomía', 'Conoce opciones para atender el exceso de piel y buscar mayor comodidad.']
  ]],
  ['no-quirurgicos', 'Procedimientos no quirúrgicos', [
    ['Aplicación de toxina botulínica', 'Explora una apariencia más relajada, conservando tu expresión.'],
    ['Rellenos con ácido hialurónico', 'Descubre opciones para realzar los detalles de tu rostro.'],
    ['Armonización facial', 'Encuentra un enfoque que considere el equilibrio de tus facciones.'],
    ['Bioestimuladores de colágeno', 'Conoce alternativas para acompañar el cuidado de tu piel.'],
    ['Rejuvenecimiento facial', 'Explora opciones para una apariencia más fresca y vital.'],
    ['Lipotransferencia facial', 'Conoce una alternativa para aportar volumen a tu rostro.'],
    ['Tratamientos de calidad de la piel', 'Dale a tu piel un espacio de atención y cuidado personal.'],
    ['Morpheus', 'Descubre una opción para renovar la apariencia de tu piel.'],
    ['Láser CO₂', 'Explora alternativas para la apariencia y textura de tu piel.']
  ]],
  ['reconstructiva', 'Cirugía reconstructiva', [
    ['Reconstrucción mamaria', 'Conoce opciones de reconstrucción que acompañen tu proceso personal.'],
    ['Reconstrucción auricular (microtia)', 'Explora alternativas para reconstruir la forma de la oreja.'],
    ['Reconstrucción nasal', 'Conoce un enfoque que considera la forma y función de tu nariz.'],
    ['Reconstrucción facial', 'Descubre una atención centrada en tu rostro y tus necesidades.'],
    ['Reconstrucción de tejidos blandos', 'Explora alternativas para recuperar zonas que necesitan atención.'],
    ['Corrección de cicatrices', 'Conoce opciones para suavizar la apariencia de tus cicatrices.'],
    ['Reconstrucción por quemaduras', 'Da el siguiente paso en el cuidado de las zonas afectadas.'],
    ['Corrección de defectos congénitos', 'Encuentra orientación para diferencias presentes desde el nacimiento.'],
    ['Reconstrucción de labio y paladar hendido', 'Conoce opciones de atención para cada etapa de este proceso.']
  ]],
  ['intima', 'Cirugía íntima', [
    ['Labioplastia', 'Explora opciones para tu comodidad íntima en un espacio de confianza.'],
    ['Vaginoplastia', 'Conoce alternativas de cuidado íntimo según tus necesidades.'],
    ['Liposucción del monte de Venus', 'Descubre opciones para armonizar el contorno de tu zona íntima.'],
    ['Monsplastia', 'Explora alternativas para el contorno y la comodidad del monte de Venus.'],
    ['Corrección de asimetrías de labios mayores', 'Busca mayor equilibrio con una atención cercana y discreta.'],
    ['Rejuvenecimiento vaginal', 'Conversa sobre opciones de cuidado para esta etapa de tu vida.'],
    ['Alargamiento y ensanchamiento de pene', 'Conoce las opciones disponibles en una consulta privada y personal.'],
    ['Embellecimiento escrotal', 'Explora tus preferencias de apariencia y comodidad con discreción.']
  ]],
  ['adicionales', 'Procedimientos adicionales', [
    ['Rinoseptumplastia', 'Explora una atención que reúne armonía nasal y respiración.'],
    ['Mamoplastia de aumento', 'Conversa sobre el volumen y las proporciones que buscas.'],
    ['Liposucción circunferencial HD con lipotransferencia glútea', 'Descubre un enfoque conjunto para la cintura y el contorno glúteo.'],
    ['Mommy Makeover', 'Explora una combinación de opciones pensada en tu etapa de vida.'],
    ['Alargamiento de pene', 'Resuelve tus dudas y conoce tus opciones en un espacio privado.'],
    ['Blefaroplastia', 'Conoce alternativas para dar una apariencia renovada a tu mirada.']
  ]]
];

if (typeof module !== 'undefined') module.exports = procedureCategories;
