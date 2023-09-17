<script setup>
    import { computed, ref } from 'vue';
    import Alerta from './Alerta.vue'
    import cerrarModal from '../assets/img/cerrar.svg'

    const error = ref('')

    const props = defineProps({
        modal:{
            type:Object,
            required:true
        },
        nombre:{
            type:String,
            required:true
        },
        cantidad:{
            type:[Number,String],
            required:true
        },
        categoria:{
            type:String,
            required:true
        },
        disponible:{
            type:Number,
            required:true
        },
        id:{
            type:[String, null],
            required:true
        }
    })

    const old = props.cantidad

    const emit = defineEmits([
        'ocultar-modal',
        'guardar-gasto',
        'eliminar-gasto',
        'update:nombre',
        'update:cantidad',
        'update:categoria',
    ])

    const agregarGasto = () => {
        //validar campos
        const {nombre, cantidad, categoria, disponible, id} = props
        if([nombre, cantidad, categoria].includes('')){
            error.value = 'todos los campos son obligatorios'
            setTimeout(() => {
                error.value = ''
            }, 3000);
            return
        }

        //validar cantidad
        if(cantidad <= 0) {
            error.value = 'cantidad no valida'
            setTimeout(() => {
                error.value = ''
            }, 3000);
            return
        }

        // Validar que el usuario no gaste más de lo disponible
        if(id) {
            // Tomar en cuenta el gasto ya realizado
            if( cantidad > old + disponible) {
                error.value = 'Has excedido el Presupuesto'
                setTimeout(() => {
                    error.value = ''
                }, 3000);
                return 
            }
        } else {
            if(cantidad > disponible) {
                error.value = 'Has excedido el Presupuesto'
                setTimeout(() => {
                    error.value = ''
                }, 3000);
                return
            }
        }
        emit('guardar-gasto')
    }

    const isEditting = computed(() => {return props.id})  

</script>

<template>
    <div class="modal">
        <div class="cerrar-modal">
            <img 
                :src="cerrarModal" alt="icono-cerrar-modal"
                @click="$emit('ocultar-modal')"
            >
        </div>
        <div 
            class="contenedor contenedor-formulario"
            :class="[modal.animar ? 'animar': 'cerrar']"
        >
            <form
                class="nuevo-gasto"
                @submit.prevent="agregarGasto"
            >
                <legend>{{isEditting ? 'editar gasto' : 'agregar gasto'}}</legend>

                <Alerta v-if="error">{{ error }}</Alerta>

                <div class="campo">
                    <label for="nombre">Nombre gasto</label>
                    <input 
                        type="text"
                        id="nombre"
                        placeholder="añade nombre del gasto"
                        :value="nombre"
                        @input="$emit('update:nombre', $event.target.value)"
                    >
                </div>

                <div class="campo">
                    <label for="cantidad">Cantidad</label>
                    <input 
                        type="text"
                        id="nombre"
                        placeholder="añade cantidad del gasto, ej: 300"
                        :value="cantidad"
                        @input="$emit('update:cantidad', $event.target.value)"
                    >
                </div>
                <div class="campo">
                    <label for="categoria">Categoria</label>
                    <select 
                        id="categoria"
                        :value="categoria"
                        @input="$emit('update:categoria', $event.target.value)"
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

                <input type="submit" :value="[isEditting ? 'guardar cambios' : 'guardar gasto' ] ">
            </form>

            <button
                type="button"
                class="btn-eliminar"
                v-if="isEditting"
                @click="$emit('eliminar-gasto')"
            >
                Eliminar Gasto
            </button>

        </div>
    </div>
</template>

<style scoped>
    .modal {
        position: absolute;
        background-color: rgb( 0 0 0/0.9);
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }

    .cerrar-modal{
        position: absolute;
        top: 3rem;
        right: 3rem;
    }

    .cerrar-modal img{
        width: 3rem;
        cursor: pointer;
    }

    .btn-eliminar{
        padding: 1.3rem;
        border: none;
        border-radius: 1rem;
        width: 100%;
        font-size:1.2rem;
        font-weight: 700;
        margin-top: 1rem;
        background-color: #ef4444;
        color: var(--blanco);
        cursor: pointer;
    }

    .contenedor-formulario{
        transition-property: all;
        transition-duration: 300ms; 
        transition-timing-function: ease-in;
        opacity: 0;
    }

    .contenedor-formulario.animar{
        opacity: 1;
    }

    .contenedor-formulario.cerrar{
        opacity: 0;
    }

    .nuevo-gasto{
        margin: 10rem auto 0 auto;
        display: grid;
        gap: 2rem;
    }
    
    .nuevo-gasto legend{
        text-align: center;
        color: white;
        font-size: 3rem;
        font-weight: 700;
    }

    .campo{
        display: grid;
        gap: 2rem;
    }

    .nuevo-gasto label{
        color: var(--blanco);
        font-size: 3rem;
    }

    .nuevo-gasto input,
    .nuevo-gasto select{
        background-color: var(--gris-claro);
        border-radius: 1rem;
        border: none;
        padding: 1rem;
        font-size: 2.2rem;
    }

    .nuevo-gasto input[type="submit"]{
        background-color: var(--azul);
        color: var(--blanco);
        transition: ease;
        transition-duration: 300ms;
        font-weight: 700;
        cursor: pointer;
    }


</style>