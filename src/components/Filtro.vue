<script setup>
    defineProps(['filtro']);
    defineEmits(['update:filtro'])
</script>


<template>
    <div class="filtros sombra contenedor">
        <form action="">
            <div class="campo">
                <label for="filtro">Filtrar Gasto</label>
                <select 
                        id="filtro"
                        :value="filtro"
                        @input="$emit('update:filtro', $event.target.value)"
                    >
                    <option value="">-- Selecione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos-varios">Gastos varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                    </select>
            </div>


        </form>

    </div>
</template>

<style scoped>
    .filtros{
        margin-top: 10rem;
    }

    .filtros .campo{
        display: flex;
        align-items: center;
        gap: 2rem;
    }

    .campo label{
        font-size: 3rem;
        font-weight: 700;
        color: var(--gris-oscuro);
    }

    .campo select{
        flex: 1;
        padding: 1rem;
        border: none;
        border-radius: 1rem;
        color: var(--gris-oscuro);
        text-align: center;
    }
</style>