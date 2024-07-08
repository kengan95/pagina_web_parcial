class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listaClientes: [],
            nombresBuscar: ''
        }
    }

    componentDidMount() {
        const rutaServicio = "https://servicios.campus.pe/servicioclientes.php";
        fetch(rutaServicio)
            .then(
                res => res.json()
            )
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        listaClientes: result
                    })
                }
            )
    }

    dibujarTabla(datosTabla) {
        const datosFiltrados = datosTabla.filter(item =>
            item["empresa"].toUpperCase().indexOf(this.state.nombresBuscar.toUpperCase())>=0 ||
            item["nombres"].toUpperCase().indexOf(this.state.nombresBuscar.toUpperCase())>=0
            )
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>usuario</th>
                        <th>clave</th>
                        <th>cargo</th>
                        <th>empresa</th>
                        <th>nombres</th>
                        <th>País</th>
                    </tr>
                </thead>
                <tbody>
                    {datosFiltrados.map(itemClientes =>
                        <tr key={itemClientes.idcliente}>
                            <td>{itemClientes.usuario}</td>
                            <td>{itemClientes.clave}</td>
                            <td>{itemClientes.cargo}</td>
                            <td>{itemClientes.empresa}</td>
                            <td>{itemClientes.nombres}</td>
                            <td>{itemClientes.pais}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    render() {
        let contenidoTabla = this.dibujarTabla(this.state.listaClientes);
        return (
            <div className="container">
            <section id="blog">
                <div className="container">
                    <h2>Blog</h2>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Buscar cliente"
                        value={this.state.nombresBuscar}
                        onChange={(e) => this.setState({ nombresBuscar: e.target.value })} /> 
                    </div>
                    {contenidoTabla}
                </div>
            </section>
            </div>
        );
    }
}