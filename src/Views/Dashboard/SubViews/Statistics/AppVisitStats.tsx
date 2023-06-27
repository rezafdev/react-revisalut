import React from "react";
import {useTranslation} from "react-i18next";
import _ from "lodash";

const IconUp = (props: {fillColor ?: string}) => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.00023 2.94967C8.08912 2.94967 8.17245 2.96345 8.25023 2.99101C8.32801 3.01856 8.40023 3.0659 8.4669 3.13301L12.8669 7.53301C13.0002 7.66634 13.0669 7.82456 13.0669 8.00767C13.0669 8.19079 13.0002 8.34923 12.8669 8.48301C12.7336 8.61634 12.578 8.68301 12.4002 8.68301C12.2225 8.68301 12.0669 8.61634 11.9336 8.48301L8.6669 5.21634L8.66689 12.683C8.66689 12.8719 8.60289 13.0275 8.47489 13.1497C8.34689 13.2719 8.18867 13.333 8.00023 13.333C7.81134 13.333 7.65289 13.269 7.52489 13.141C7.39689 13.013 7.33312 12.8548 7.33356 12.6663L7.33356 5.21634L4.06689 8.48301C3.93356 8.61634 3.77801 8.68301 3.60023 8.68301C3.42245 8.68301 3.26689 8.61634 3.13356 8.48301C3.00023 8.34967 2.93356 8.19123 2.93356 8.00767C2.93356 7.82412 3.00023 7.6659 3.13356 7.53301L7.53356 3.13301C7.60023 3.06634 7.67245 3.01901 7.75023 2.99101C7.82801 2.96301 7.91134 2.94923 8.00023 2.94967Z"
          fill={props?.fillColor ?? "#01505F"}/>
</svg>)

const IconDown = (props: {fillColor ?: string}) => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.99977 13.0503C7.91088 13.0503 7.82755 13.0365 7.74977 13.009C7.67199 12.9814 7.59977 12.9341 7.53311 12.867L3.13311 8.46699C2.99977 8.33366 2.93311 8.17544 2.93311 7.99233C2.93311 7.80921 2.99977 7.65077 3.13311 7.51699C3.26644 7.38366 3.42199 7.31699 3.59977 7.31699C3.77755 7.31699 3.93311 7.38366 4.06644 7.51699L7.33311 10.7837L7.33311 3.31699C7.33311 3.1281 7.39711 2.97255 7.52511 2.85033C7.65311 2.7281 7.81133 2.66699 7.99977 2.66699C8.18866 2.66699 8.34711 2.73099 8.47511 2.85899C8.60311 2.98699 8.66688 3.14521 8.66644 3.33366V10.7837L11.9331 7.51699C12.0664 7.38366 12.222 7.31699 12.3998 7.31699C12.5776 7.31699 12.7331 7.38366 12.8664 7.51699C12.9998 7.65032 13.0664 7.80877 13.0664 7.99233C13.0664 8.17588 12.9998 8.3341 12.8664 8.46699L8.46644 12.867C8.39977 12.9337 8.32755 12.981 8.24977 13.009C8.17199 13.037 8.08866 13.0508 7.99977 13.0503Z"
          fill={props?.fillColor ?? "#753F3F"}/>
</svg>)

const AppVisitStats = (props: {
    colSpan?: number,
    title: string,
    value: string|number,
    change: number,
    changeSymbol?: string|null,
}) => {
    const {t} = useTranslation()
    return (
        <div className={`${!!props.colSpan ? `col-span-${props.colSpan}` : 'col-span-7'} shadow-sm w-full h-full bg-white rounded rounded-xl flex flex-row justify-between items-center p-6`}>
            <div className='flex flex-col items-start gap-1'>
                <span className='text-[#23272E] font-semibold text-lg'>{props.title}</span>
                <span className='text-[#8B909A] font-medium text-sm'>{t('Last7Days')}</span>
                <span className='mt-6 text-[#23272E] font-bold text-3xl'>{props.value}</span>
                <div className='flex flex-row justify-start items-center gap-x-1'>
                    {_.toNumber(props.change) > 0 && <IconUp />}
                    {_.toNumber(props.change) < 0 && <IconDown />}
                    <span className={`font-medium text-sm ${_.toNumber(props.change) < 0 ? 'text-[#753F3F]' : 'text-[#01505F]'}`}>{props.change}{props.changeSymbol??''}</span>
                    <span className='text-[#8B909A] font-medium text-sm ml-1'>{t('VsLast7Days')}</span>
                </div>
            </div>

            <div>
                <img src={'/total_app_chart.png'} />
            </div>
        </div>
    )
}
export default AppVisitStats
