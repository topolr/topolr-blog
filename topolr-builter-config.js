/*
 * topolr-builter version 0.5.0
 * built product developed by topolr web framework
 * topolr-builter-config:
 *   basePath      - app base path
 *   bootPacket    - app boot packet
 *   bootFolder    - app top packet folder
 *   develop       - develop mapping,when trigger develop
 *   publish       - develop mapping,when trigger publish
 *   output        - output folder,relative basePath
 *   pageTemp      - boot index page,relative basePath
 *   outMap        - out map file is or not make
 *   ignore        - scan without files
 *       -default:['*.DS_Store','*.*___jb_tmp___']
 *   maker         - custom maker mapping
 *       -like:{makerName:function(content,done){
 *                   done(dosomethind(content));
 *              }}
 *       -default maker:
 *         'jsmaker','lessparser','sassparser','cssmaker','cssprefixmaker'
 *         'htmlmaker','mdparser','jsonmaker','templatemaker','babelmaker'
 *   sequnce       - make sequnce
 *       -default sequnce:
 *          js:['jsmaker']
 *          css:['cssprefixmaker','cssmaker']
 *          less:['lessparser','cssprefixmaker','cssmaker']
 *          scss:['sassparser','cssprefixmaker','cssmaker']
 *          md:['mdparser','htmlmaker']
 *          html:['htmlmaker']
 *          json:['jsonmaker']
 *          template:['templatemaker']
 *          babel:['babelmaker','jsmaker']
 *   outmapSequnce - out map file make sequnce
 *       -default outmapSequnce:
 *          js:{step:['jsmaker'],to:'js'}
 *          css:{step:['cssprefixmaker','cssmaker'],to:'css'}
 *          less:{step:['lessparser','cssprefixmaker','cssmaker'],to:'css'}
 *          scss:{step:['sassparser','cssprefixmaker','cssmaker'],to:'css'}
 *          md:{step:['mdparser','htmlmaker'],to:'html'}
 *          html:{step:['htmlmaker'],to:'html'}
 *          json:{step:['jsonmaker'],to:'json'}
 *          babel:{step:['babelmaker','jsmaker'],to:'json'}
 */

module.exports={
    basePath:"./app/src/",
    bootPacket:"option.root",
    bootFolder:"option/",
    maker:{},
    develop:{
        output:"../dist/",
        pageTemp:"./../../index.nsp",
        outMap:false,
        sequnce:{},
        outmapSequnce:{},
    },
    publish:{
        output:"../pub/",
        pageTemp:"./../../index.nsp",
        outMap:false,
        sequnce:{},
        outmapSequnce:{}
    }
};
