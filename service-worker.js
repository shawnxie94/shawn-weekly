/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-ffd35893'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/style-cfK9SLyA.css",
    "revision": "582103bb20fe937627eaeb263a641d4e"
  }, {
    "url": "assets/photoswipe.esm-CKV1Bsxh.js",
    "revision": "3f149419294375723d546c3bef61a762"
  }, {
    "url": "assets/index.html-qshTlbQY.js",
    "revision": "3a73dfdb7c82f919ad022342c379484d"
  }, {
    "url": "assets/index.html-HJr1YKi2.js",
    "revision": "5f61658b410ac90e5d784e7a1f3bb47b"
  }, {
    "url": "assets/index.html-D8jvz5FG.js",
    "revision": "df0c4e861a7aacaf44b7cfb4f0000875"
  }, {
    "url": "assets/index.html-D3GNOUux.js",
    "revision": "5891183eb71038fc9b9375c5646ed503"
  }, {
    "url": "assets/index.html-BuUmwwbg.js",
    "revision": "0fb4c618cbd45ff15d4adff3ebb05b92"
  }, {
    "url": "assets/index.html-Brvvhf52.js",
    "revision": "2a32e051eb2789de1de67b20779ab12a"
  }, {
    "url": "assets/index.html-BXOf52K2.js",
    "revision": "bb371a1fc2863f6c9e14d3e28c285d1b"
  }, {
    "url": "assets/index.html-BVgDhKsX.js",
    "revision": "14c4d75a9113ab802586abc304955689"
  }, {
    "url": "assets/index.html-BRTTxz4C.js",
    "revision": "b6c7db584baf4d67fd10a5f137511ec9"
  }, {
    "url": "assets/index.html-4iwqqqTU.js",
    "revision": "307410fa1c21e7eda7677acf61470cbb"
  }, {
    "url": "assets/index.html-21ifB7RY.js",
    "revision": "7b54ca47c4757b4f648a351464a173c1"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/giscus-CpJ6lC06.js",
    "revision": "14bfaa79e2103278eb0702fb1bfe2491"
  }, {
    "url": "assets/app-CY50oekO.js",
    "revision": "b0a86e08d987d8ca458c8c2842aef33a"
  }, {
    "url": "assets/SearchResult-Bdh_HcHQ.js",
    "revision": "1e57270199f77a7d685d5704929553a4"
  }, {
    "url": "assets/9.html-BniwcwjY.js",
    "revision": "fbbee4606af96fa457aaf8d92696d939"
  }, {
    "url": "assets/83.html-BYTSS9qN.js",
    "revision": "ebb86d249c8aad6edc03637b713b9801"
  }, {
    "url": "assets/82.html-DLmIExYr.js",
    "revision": "765e9678d8d05addd5543931beb18e33"
  }, {
    "url": "assets/81.html-BKLqUya2.js",
    "revision": "c36bffd5c8dbf319474a90d0ce39ae2b"
  }, {
    "url": "assets/80.html-AgNnAGY-.js",
    "revision": "7e4d3080fb5de3d77863c922d616f98d"
  }, {
    "url": "assets/8.html-Dv7aNWFN.js",
    "revision": "f02a0b3496de92fbe8790aedde524cf2"
  }, {
    "url": "assets/79.html-6nIgSSTO.js",
    "revision": "6b21f3185f6923df08dd70601bea9a11"
  }, {
    "url": "assets/78.html-LmAfh-B-.js",
    "revision": "31c06d793074acc77f5edddf5a7367d1"
  }, {
    "url": "assets/77.html-Dl2Jbdgs.js",
    "revision": "9b2b128bbc38d2c90a274cee149af9ec"
  }, {
    "url": "assets/76.html-DsfSsjR8.js",
    "revision": "74a0238c506c900518d6990ee301d7d5"
  }, {
    "url": "assets/75.html-DIobpJuq.js",
    "revision": "8b66d1b982769893a9ff67e61cfd3037"
  }, {
    "url": "assets/74.html-D4d0wu_3.js",
    "revision": "a87b39857193d85827c4311b0df4822c"
  }, {
    "url": "assets/73.html-Csf6aj8A.js",
    "revision": "6d63193197798fa77903a1ceeb56d810"
  }, {
    "url": "assets/72.html-Y1D6tdgV.js",
    "revision": "809ba9808c9147b78d8808fa198dd55b"
  }, {
    "url": "assets/71.html-CYiOhTis.js",
    "revision": "f7eb389d9cfebefb7fe78ccf48a9248d"
  }, {
    "url": "assets/70.html-CcnPZSQX.js",
    "revision": "5043bb617f7cdcde34bfd53db58f7f67"
  }, {
    "url": "assets/7.html-ByQsTgGq.js",
    "revision": "d92b0f8660958b6e2b8163197bf7f196"
  }, {
    "url": "assets/69.html-D7zB9j57.js",
    "revision": "70b35ceeba05fcbcda63c214b3bb7414"
  }, {
    "url": "assets/68.html-C2uB9j14.js",
    "revision": "3e61b5efc71fa577f6e1f597579c1b07"
  }, {
    "url": "assets/67.html-O07RjruN.js",
    "revision": "4635a5f5f7009f22b3200dca6a7c0854"
  }, {
    "url": "assets/66.html-kvUZ0yog.js",
    "revision": "3a1bbaa70b896f9364a005206d1fc4aa"
  }, {
    "url": "assets/65.html-B8ru0wa0.js",
    "revision": "8b82bdfa73b6a9ab709e3dabf80d83a2"
  }, {
    "url": "assets/64.html-Dl0IPXf3.js",
    "revision": "036845b65ae8f4467cdd08985fb90f18"
  }, {
    "url": "assets/63.html-Bre7MmD1.js",
    "revision": "2f6d40a0a4b41cb86a5ec0952fb356e4"
  }, {
    "url": "assets/62.html-C6UyUUYo.js",
    "revision": "78d8814192025803154de53b0f42324c"
  }, {
    "url": "assets/61.html-zxWM2kjx.js",
    "revision": "4212206423f581fee58fbf7807b848e0"
  }, {
    "url": "assets/60.html-DquuGBiR.js",
    "revision": "b89c51cd3baeca8cc1a96bb8854a5e4e"
  }, {
    "url": "assets/6.html-mmSoverf.js",
    "revision": "7c6f8c012ad1129a39826c90d4917611"
  }, {
    "url": "assets/59.html-BlneFpM6.js",
    "revision": "5c1642e9bf668692c81e1e44cf1ca4c6"
  }, {
    "url": "assets/58.html-BhLI7QFQ.js",
    "revision": "5bdde4536a962a979c9b3494625d641e"
  }, {
    "url": "assets/57.html-B4KzHuQp.js",
    "revision": "d605640108d97d8775c99c6dd266bf10"
  }, {
    "url": "assets/56.html-DJpMlNt_.js",
    "revision": "a89b64d3d7bbac4531d0855261009af9"
  }, {
    "url": "assets/55.html-CCfHTAIz.js",
    "revision": "8e4b7d8d321faaef990dc2e632a2c46d"
  }, {
    "url": "assets/54.html-GM2fypPQ.js",
    "revision": "956f580f7b0f87fe17eb02153dbf531e"
  }, {
    "url": "assets/53.html-BtUQ-00M.js",
    "revision": "018a9016ebc575bc668f14d99318e6e3"
  }, {
    "url": "assets/52.html-CDP4lNFC.js",
    "revision": "3ac428f19e1b28ad55087cfaa67c8d3f"
  }, {
    "url": "assets/51.html-DJ9DQCrn.js",
    "revision": "4c6bd4f82745ab52c62c8ccf7913a3ac"
  }, {
    "url": "assets/50.html-B9pLqdOJ.js",
    "revision": "b90aca541a85527f0a9a9cbd8b8de8c5"
  }, {
    "url": "assets/5.html-DmRh0-Us.js",
    "revision": "654f66ff4624c11718f0bb4fbe300d5f"
  }, {
    "url": "assets/49.html-CB79fOrL.js",
    "revision": "1ecea02f2534de52f545057fabc6858d"
  }, {
    "url": "assets/48.html-C_LcY3Li.js",
    "revision": "40715ea56321aaed4ca11ed5c1e0cc5d"
  }, {
    "url": "assets/47.html-CWo9ggHC.js",
    "revision": "a6f018aeaeffef88a2b2646cb093461d"
  }, {
    "url": "assets/46.html-B7B4OLrQ.js",
    "revision": "77abaffc78f968dfb2132a0d291bc0c3"
  }, {
    "url": "assets/45.html-CSuLnsJq.js",
    "revision": "537b4615c7f09e8c2d0fdd7ba99da5f4"
  }, {
    "url": "assets/44.html-DUN_11z-.js",
    "revision": "47867968f94913007116141bb80120a3"
  }, {
    "url": "assets/43.html-D9xQq0QW.js",
    "revision": "f56cddf064de91b879e8bb3a48c0c0df"
  }, {
    "url": "assets/42.html-CrB4HqJG.js",
    "revision": "a9841013e8c8ca3356f0b444128a9cf3"
  }, {
    "url": "assets/41.html-BseH61W5.js",
    "revision": "58288413af4bc322c9227c9559064873"
  }, {
    "url": "assets/404.html--pmWOGzU.js",
    "revision": "6ffaaef732e46ee15ec842dc256599c2"
  }, {
    "url": "assets/40.html-bo6jSKba.js",
    "revision": "cf1448257bef85544152dae248b9f45f"
  }, {
    "url": "assets/4.html-D0gvfQs4.js",
    "revision": "a81cbe9a99145889fc6f53285889fc97"
  }, {
    "url": "assets/39.html-BNM4phSL.js",
    "revision": "6f7735ffdc58cb46ccb69036bf3c6aa8"
  }, {
    "url": "assets/38.html-B_hhchVt.js",
    "revision": "08b9dae7312a89276a0963a7461e61a8"
  }, {
    "url": "assets/37.html-DJP7DSY0.js",
    "revision": "f155c5478caad084c87797b1514d1bed"
  }, {
    "url": "assets/36.html-VyPI6Xcw.js",
    "revision": "038ae14c943e30ab7351e93d1db14ae8"
  }, {
    "url": "assets/35.html-BdrM0Mai.js",
    "revision": "71116d11411f46a9c70e95f440992773"
  }, {
    "url": "assets/34.html-De6NJNzi.js",
    "revision": "aa4e72a4eb2eba90d62d1e1493080ca0"
  }, {
    "url": "assets/33.html-CIVAyDsm.js",
    "revision": "0daa761d126393a7d3e46b54dcfe0435"
  }, {
    "url": "assets/32.html-DAKsemQ5.js",
    "revision": "b19354543ee4fbef6966d61303e0df6d"
  }, {
    "url": "assets/31.html-DRI2xS2E.js",
    "revision": "a1176997cd1580837f3a6b3747a0a135"
  }, {
    "url": "assets/30.html-CrgZ1SQX.js",
    "revision": "a5e3adcfeae6e0e996072c147c263d67"
  }, {
    "url": "assets/3.html-VSZGlCZ5.js",
    "revision": "9a8e173bbf693ec860edc27d57784cf6"
  }, {
    "url": "assets/29.html-K5FpOuSb.js",
    "revision": "ef014bd69a768c8aaf6f370512a22f60"
  }, {
    "url": "assets/28.html-D9ijK7ce.js",
    "revision": "fc9a7cb042e733a6126ab5ce42c1568b"
  }, {
    "url": "assets/27.html-Bia7y_jQ.js",
    "revision": "c91fd978d1ef3b7c4a1d14d9b2aae4f0"
  }, {
    "url": "assets/26.html-D1ROl-Pm.js",
    "revision": "df56a72b566ff9d524ef8044f86ed0d4"
  }, {
    "url": "assets/25.html-Cb8A77EJ.js",
    "revision": "b8586b96096d2565bca1b805c7d75342"
  }, {
    "url": "assets/24.html-CNsQmNro.js",
    "revision": "4013fdf50b87a8c3811cd875561aae06"
  }, {
    "url": "assets/23.html-yZI5QzL5.js",
    "revision": "6fe9c7d72fcb1c21ec99c2390fcc908d"
  }, {
    "url": "assets/22.html-BUPuptf5.js",
    "revision": "93cb2fa4ba8fa1dca790283c78457370"
  }, {
    "url": "assets/21.html-ezK1FEMt.js",
    "revision": "23bbe6d055f9c28b2c90913322f1b4cc"
  }, {
    "url": "assets/2025.html-BNLyWqsJ.js",
    "revision": "9ab8bdd501c3fd15916a64fd20807554"
  }, {
    "url": "assets/2024.html-Du979JH_.js",
    "revision": "2c3d3cd3bce1e3bf3b55264664b0fce2"
  }, {
    "url": "assets/20.html-BQLPApCC.js",
    "revision": "548f59ff3bd9191020cd177fc4132412"
  }, {
    "url": "assets/2.html-6SLJwewK.js",
    "revision": "b847d49aa17d48d2712a91768f55bd82"
  }, {
    "url": "assets/19.html-BR9_LDs-.js",
    "revision": "4edb5cc4045261b2d9f92e485cbb0910"
  }, {
    "url": "assets/18.html-BXKyQ_0u.js",
    "revision": "f3c26871880d2d4a6b77d9105c9610b8"
  }, {
    "url": "assets/17.html-DAaBO7kA.js",
    "revision": "a8e4405becb9bbf3bc54c533d8ab26af"
  }, {
    "url": "assets/16.html-DHgbJq1I.js",
    "revision": "97038c7f4bf9721074fbabd1e4c95a57"
  }, {
    "url": "assets/15.html-g5U6RwAf.js",
    "revision": "f2751fbe17cd267ad4c8afc59c228023"
  }, {
    "url": "assets/14.html-CdCZbl2-.js",
    "revision": "0f5c4e382670d5541aacd17a67498ab5"
  }, {
    "url": "assets/13.html-DAh6Onf6.js",
    "revision": "871fd7aa1440bb013db3eafd788fd1f3"
  }, {
    "url": "assets/12.html-gGnPRGIy.js",
    "revision": "f142dccbf28aeea857de8f215d7c5baa"
  }, {
    "url": "assets/11.html-DzEXI7j0.js",
    "revision": "a7b432cc8f90772d53dd8c76b11538a5"
  }, {
    "url": "assets/10.html-Ct5L2AJO.js",
    "revision": "067ce51276ec3713e0c7593b8e6aa60f"
  }, {
    "url": "assets/1.html-BK5K6kIj.js",
    "revision": "e51331453c173e5e3eee3bd40d89a01e"
  }, {
    "url": "index.html",
    "revision": "e4ba8c0d37ef197e4466c46473286fbd"
  }, {
    "url": "404.html",
    "revision": "d0cbd38539025e37a333f63c4aa5cef4"
  }], {});
  workbox.cleanupOutdatedCaches();

}));
