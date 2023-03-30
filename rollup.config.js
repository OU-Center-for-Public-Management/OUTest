import less from 'rollup-plugin-less';
import postcss from 'rollup-plugin-postcss';
import flexbugs from 'postcss-flexbugs-fixes';
import cssnano from 'cssnano';
import autoprefixer from "autoprefixer";

export default {
    input : './less/totara.less',
    output : {
        name : 'style',
        file : './style/totara.css',
        format : 'iife',
        globals : {},
    },

    plugins : [
        postcss(
            {
                preprocessor : (content, id) => new Promise(
                    ( resolve, reject ) => {
                        const result = less.renderSync( { file : id } );
                        resolve( { code : result.css.toString() } );
                    } ),
                plugins : [
                    flexbugs,
                    autoprefixer,
                    cssnano,
                ],
                sourceMap : true,
                extract : true,
            },
        ),
    ],
};