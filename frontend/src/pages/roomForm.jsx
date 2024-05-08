export function RoomForm({ handleChange, handleSubmit, formData }) {
  return (
    <div className="flex ">
      <form onSubmit={handleSubmit}>
        <div className="">
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Descripción:
            <textarea
              row="10"
              cols="18"
              placeholder="Introducir la descripción de la sala"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </label>
        </div>
        <div>
          <label>
            Capacidad:
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Tipo:
            <select
              name="typeOf"
              value={formData.typeOf}
              id="typeOf"
              onChange={handleChange}
              required
            >
              <option value="Pública">Pública</option>
              <option value="Privada">Privada</option>
            </select>
          </label>
        </div>
        <button type="submit">Crear habitación</button>
      </form>
    </div>
  );
}
