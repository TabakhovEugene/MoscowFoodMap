// app/fonts.ts
import localFont from 'next/font/local';

export const euclidCircular = localFont({
    src: [
        {
            path: '../../public/fonts/EuclidCircularABold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../public/fonts/EuclidCircularABoldItalic.ttf',
            weight: '700',
            style: 'italic',
        },
        {
            path: '../../public/fonts/EuclidCircularAItalic.ttf',
            weight: '400',
            style: 'italic',
        },
        {
            path: '../../public/fonts/EuclidCircularALight.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/fonts/EuclidCircularALightItalic.ttf',
            weight: '300',
            style: 'italic',
        },
        {
            path: '../../public/fonts/EuclidCircularAMedium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/fonts/EuclidCircularAMediumItalic.ttf',
            weight: '500',
            style: 'italic',
        },
        {
            path: '../../public/fonts/EuclidCircularARegular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/EuclidCircularASemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../public/fonts/EuclidCircularASemiBoldItalic.ttf',
            weight: '600',
            style: 'italic',
        },
    ],
    variable: '--font-euclid',
});