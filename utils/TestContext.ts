interface ClienteInfo {
    nombre: string;
    tributacion: string;
}

export class TestContext {
    private static instance: TestContext;
    private clienteActual: ClienteInfo = { nombre: '', tributacion: 'No Exento' };

    private constructor() {}

    static getInstance(): TestContext {
        if (!TestContext.instance) {
            TestContext.instance = new TestContext();
        }
        return TestContext.instance;
    }

    setCliente(cliente: ClienteInfo) {
        this.clienteActual = cliente;
    }

    getCliente(): string {
        return this.clienteActual.nombre;
    }

    getTributacion(): string {
        return this.clienteActual.tributacion;
    }

    clear() {
        this.clienteActual = { nombre: '', tributacion: 'No Exento' };
    }
}