<script setup>
import { computed } from 'vue';

import {formatearCantidad} from '../helpers/index'
import CircleProgress from 'vue3-circle-progress-bar'


defineEmits(['resetear-presupuesto'])

const props = defineProps({
    presupuesto:{
        type:Number,
        required:true
    },
    disponible:{
        type:Number,
        required:true
    },
    gastado:{
        type:Number,
        required:true
    }
})

const porcentaje = computed(() => {
    return parseInt(((props.presupuesto - props.disponible) / props.presupuesto) * 100)
})

</script>

<template>
    <div class="dos-columnas">
        <div class="contenedor-grafico">
            <p class="porcentaje">{{ porcentaje }}%</p>
            <CircleProgress
                :percent="porcentaje"
                :size="250"
            />
        </div>


        <div class="contenedor-presupuesto">
            <button
                class="reset-app"
                type="button"
                @click="$emit('resetear-presupuesto', $event.target.value)"
            > resetear app</button>
            <p><span>Presupuesto: </span>
                {{ formatearCantidad(presupuesto)}}
            </p>

            <p><span>Disponible: </span>
                {{ formatearCantidad(disponible)}}
            </p>

            <p><span>Gastado: </span>
                {{formatearCantidad(gastado)}}
            </p>
        </div>
    </div>
</template>

<style  scoped>
    .dos-columnas{
        display: flex;
        flex-direction: column;
    }

    .dos-columnas > :first-child{
        margin-bottom: 3rem;
    }

    .contenedor-grafico{
        position: relative;
    }

    .porcentaje{
        position: absolute;
        margin: auto;
        top: calc(50% - 1.5rem);
        left:0;
        right:0;
        text-align: center;
        z-index: 100;
        font-size: 3rem;
        font-weight: 900;
        color: var(--gris-oscuro);
    }

    @media (min-width: 768px) {
        .dos-columnas{
            flex-direction: row;
            gap: 4rem;
            align-items: center;
        }
        .dos-columnas > :first-child{
            margin-bottom: 0rem;
        }
    }

    .reset-app{
        background-color: #db2777;
        border: none;
        padding: 1rem;
        width: 100%;
        color: var(--blanco);
        font-weight:900;
        text-transform: uppercase;
        border-radius: 1rem;
        transition-property: background-color;
        transition-duration: 300ms ;
    }

    .reset-app:hover{
        cursor: pointer;
        background-color: #9b1953;
    }
    .contenedor-presupuesto{
        width: 100%;
    }

    .contenedor-presupuesto p{
        font-size:2.4rem;
        text-align: center;
    }

    @media(min-width: 768px) {
        .contenedor-presupuesto p{
            text-align: left;
        }
    }

    .contenedor-presupuesto span {
        font-weight: 900;
        color: var(--azul);
    }
</style>