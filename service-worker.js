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
    "url": "assets/style-LuRfvCrO.css",
    "revision": "37c8129ad90cbf116b6cbd0da322a65d"
  }, {
    "url": "assets/photoswipe.esm-CKV1Bsxh.js",
    "revision": "3f149419294375723d546c3bef61a762"
  }, {
    "url": "assets/index.html-iwx5L25N.js",
    "revision": "da4bd5eb913666a1834df3c6000abad8"
  }, {
    "url": "assets/index.html-YtNlHbXV.js",
    "revision": "3129c4ecb6dc82bba15710543f311300"
  }, {
    "url": "assets/index.html-DnEPTbqQ.js",
    "revision": "3d160a9d9447ff4330147ef74191939a"
  }, {
    "url": "assets/index.html-Dcd0mrku.js",
    "revision": "953e2912a25808868755217d155f13df"
  }, {
    "url": "assets/index.html-CrQ95I3k.js",
    "revision": "17e991a4af72d180c4a26a0c4d93a3fe"
  }, {
    "url": "assets/index.html-CmQkHiyH.js",
    "revision": "35aee3c5085af0f3ab15ceccf4a0cf46"
  }, {
    "url": "assets/index.html-C2elkIM2.js",
    "revision": "8850b3997e8fb56b83db048802e1a35d"
  }, {
    "url": "assets/index.html-BzqoyaDP.js",
    "revision": "645761410c3d70fa38a9854d562b7377"
  }, {
    "url": "assets/index.html-BhyfiNDL.js",
    "revision": "2d7ac8a9aa7fde4e8ca0a604cfc2a446"
  }, {
    "url": "assets/index.html-BQ1PbMRC.js",
    "revision": "4cbb4b978311ddf9bfe671f8fb7c0d73"
  }, {
    "url": "assets/index.html-8J6ww5b6.js",
    "revision": "90ae2148fe161334bf8ea394eb8b8721"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/giscus-CpJ6lC06.js",
    "revision": "14bfaa79e2103278eb0702fb1bfe2491"
  }, {
    "url": "assets/app-BfOnqqhE.js",
    "revision": "313daef9aa546d4488b7927b7900844b"
  }, {
    "url": "assets/SearchResult-dxBWuiUN.js",
    "revision": "30bcffb3d9b6e6c642c17a18d3247555"
  }, {
    "url": "assets/9.html-CFlOHkrG.js",
    "revision": "e807188c629b8912dc1db3203d738c82"
  }, {
    "url": "assets/87.html-CKPQ2iCO.js",
    "revision": "7fe48df64a7c24ebfeb7b0ebfaa7d49e"
  }, {
    "url": "assets/86.html-C5m5otI6.js",
    "revision": "e75aa64b6502b7dcb7e3fee459a1c12e"
  }, {
    "url": "assets/85.html-D42sxV_i.js",
    "revision": "0df91a6fc8f98c2e629b4ca42b699299"
  }, {
    "url": "assets/84.html-DzRdwMn7.js",
    "revision": "63eff3f45d27654c7ab38034210dc871"
  }, {
    "url": "assets/83.html-BnFlavB9.js",
    "revision": "279a58248b9ba5772082851ea6e12db1"
  }, {
    "url": "assets/82.html-CUHfWImb.js",
    "revision": "a9b4b8bfc96a1a9e3ddef4adc07f8493"
  }, {
    "url": "assets/81.html-DvvGh5mx.js",
    "revision": "7d33ff39ee5ad7d4c4df9eb3bae8e65e"
  }, {
    "url": "assets/80.html-dvfrpUa8.js",
    "revision": "586254449e56e31f3c4573a90d983f44"
  }, {
    "url": "assets/8.html-D9f7MKRO.js",
    "revision": "06615f28722880fd9820f86c5aa2dc14"
  }, {
    "url": "assets/79.html-CGJd9Leq.js",
    "revision": "ac96e472a2a7e5ee3cd1f6b157845307"
  }, {
    "url": "assets/78.html-DYQqY_ZB.js",
    "revision": "2bd15b66a1f6245660eacb961f715b7b"
  }, {
    "url": "assets/77.html-DYF7U8RB.js",
    "revision": "0450788c19b80cfbce8809874c3a5c2f"
  }, {
    "url": "assets/76.html-C0xnxYc_.js",
    "revision": "137c86a117f073304812b9ae5b51bcad"
  }, {
    "url": "assets/75.html-DZHpwhU0.js",
    "revision": "3c8b21cd362c60377d2bba17de942137"
  }, {
    "url": "assets/74.html-Bl9YjVRD.js",
    "revision": "f3e19f8cff847b47ea1afefce5554c6b"
  }, {
    "url": "assets/73.html-BA8kQwHR.js",
    "revision": "fae7d9505dd477229541307ca5f73a85"
  }, {
    "url": "assets/72.html-DGICgzMk.js",
    "revision": "14d293c187783d9fe4d9d87c40183fdf"
  }, {
    "url": "assets/71.html-Ck_ijYuR.js",
    "revision": "0d8bd12beade49ae12d4c5ea7db17e49"
  }, {
    "url": "assets/70.html-ChAJp34-.js",
    "revision": "39543b631ef945bd1e25290eb854bfcc"
  }, {
    "url": "assets/7.html-BbNodNWp.js",
    "revision": "fc70878adfc57fecf90af14c246af45d"
  }, {
    "url": "assets/69.html-SQkqnIei.js",
    "revision": "333f0ba2f4bafb03238b9c3dfbd333f7"
  }, {
    "url": "assets/68.html-BEez3x0J.js",
    "revision": "fab6e37fde6ea9f1ef51fc9379f07683"
  }, {
    "url": "assets/67.html-DKQeRiGO.js",
    "revision": "3a1a7eb916767570f251bd4cd52e8549"
  }, {
    "url": "assets/66.html-DN2QIHW6.js",
    "revision": "de96788c54dd6adeead15f4e31d206fb"
  }, {
    "url": "assets/65.html-DN7Fz5_3.js",
    "revision": "5287e12dd5f87631c982f419ff87ddb4"
  }, {
    "url": "assets/64.html-CFm5M_Ct.js",
    "revision": "7852418b9a906d8b3438b15fc983d45c"
  }, {
    "url": "assets/63.html-DGC-tF7T.js",
    "revision": "ce3a03162200696d29633430524624ad"
  }, {
    "url": "assets/62.html-C2Ru1F8J.js",
    "revision": "e399e87d0dc4fed22ad2a8b55b978c86"
  }, {
    "url": "assets/61.html-BMlPOLxj.js",
    "revision": "5878eb6706a1cc8ecc4669c9d5d803bc"
  }, {
    "url": "assets/60.html-DZvShXBc.js",
    "revision": "683226fe0ac8f6aaf5e5739c01a59e64"
  }, {
    "url": "assets/6.html-8Ohdlvk_.js",
    "revision": "837e4e1374287996633f9eb0bc37e01c"
  }, {
    "url": "assets/59.html-Bxgw92fC.js",
    "revision": "aa8f0ecc137a6c062a220e3346fd63b3"
  }, {
    "url": "assets/58.html-uJX7hMHo.js",
    "revision": "be246f3af6a37119beebff44fa138bdc"
  }, {
    "url": "assets/57.html-B8d2FTZG.js",
    "revision": "54ac3c898a3e692ab529a62229d37ecc"
  }, {
    "url": "assets/56.html-BBqULH9j.js",
    "revision": "cc7bba61120d50ae94c718367484f5bf"
  }, {
    "url": "assets/55.html-ClaEiwaV.js",
    "revision": "ce722f6f729eca6cc13509f1b30f9aa6"
  }, {
    "url": "assets/54.html-C0RFR49J.js",
    "revision": "eb5f8c3b336cd5f4bbfb01313d5991c2"
  }, {
    "url": "assets/53.html-Bvg6VwT-.js",
    "revision": "a94cc28239bce6df72fe9f1efce22014"
  }, {
    "url": "assets/52.html-BwrbBO54.js",
    "revision": "cc2b277aed59d78f1311a45fd288939f"
  }, {
    "url": "assets/51.html-BxhRwM0-.js",
    "revision": "d90b27041f39e5855bf4cef542ab1b6e"
  }, {
    "url": "assets/50.html-DlprUVsr.js",
    "revision": "ce840bc7f2870e8ec3ececce090f0f15"
  }, {
    "url": "assets/5.html-DHs7humN.js",
    "revision": "abc1e502b0ea18d635a5d7ed4af5025c"
  }, {
    "url": "assets/49.html-ByqNTDgn.js",
    "revision": "65d9c1044c19b09dfd3b53d2002587bd"
  }, {
    "url": "assets/48.html-DUrgvf6-.js",
    "revision": "15c5553c1da10b3ea70f8eaca2c5fa58"
  }, {
    "url": "assets/47.html-CmtQSg1T.js",
    "revision": "3f260c8bb064cc601c53ce4f6f513c09"
  }, {
    "url": "assets/46.html-CCs2QYjq.js",
    "revision": "68a8922e7c9740c72ce02d04456b46e1"
  }, {
    "url": "assets/45.html-CxLpF6Bb.js",
    "revision": "5ac4d70655594e02fb43a4d15f1db60a"
  }, {
    "url": "assets/44.html-Bd23qpdh.js",
    "revision": "f8e600c8afb321f7b8c20918582c9079"
  }, {
    "url": "assets/43.html-MZF29swh.js",
    "revision": "16300d1c58c3511a464b2a21807733e7"
  }, {
    "url": "assets/42.html-Cnt3qPIw.js",
    "revision": "ceca45933a26e7937e84bd0489e930a5"
  }, {
    "url": "assets/41.html-6iLZ8h8y.js",
    "revision": "c987b39ffef147ed257799cece8fb176"
  }, {
    "url": "assets/404.html-Du-pPD_E.js",
    "revision": "b73fa28958e36dbf2662041c81873302"
  }, {
    "url": "assets/40.html-CMBkShIE.js",
    "revision": "60ba38a5057d286d94c2562e5f47d357"
  }, {
    "url": "assets/4.html-Z5IOqfFo.js",
    "revision": "0629d3442ee5ac5df46d8176a9d3da7c"
  }, {
    "url": "assets/39.html-DpXdh0U4.js",
    "revision": "8a1591816cca9193684106aafc675c4f"
  }, {
    "url": "assets/38.html-Be7JYUk6.js",
    "revision": "eff69ea66f5003bacae4a86d455aa600"
  }, {
    "url": "assets/37.html-Bobyi3Xk.js",
    "revision": "dc98febbde2e006e46d6049fb7cb1a3f"
  }, {
    "url": "assets/36.html-dZhql6kT.js",
    "revision": "839243c9c17bcf087e997a8c2b835d19"
  }, {
    "url": "assets/35.html-APTYTEvP.js",
    "revision": "e28eec5cec252a0088cf7eb6a507f104"
  }, {
    "url": "assets/34.html-CeDJG_Zt.js",
    "revision": "94aeef7df20612bde74972076326b5dc"
  }, {
    "url": "assets/33.html-Ci4Tpd33.js",
    "revision": "4bfe0b4af1a692074da8e35f3f9e20e1"
  }, {
    "url": "assets/32.html-qyWmzYRl.js",
    "revision": "846f08f06704bf9062f3d7b88ebac2d4"
  }, {
    "url": "assets/31.html-DYMYoLl-.js",
    "revision": "85094603d2dc5d186a2be6ac35462ad3"
  }, {
    "url": "assets/30.html-DdmGLsyr.js",
    "revision": "476ea304c02417f6333767ad58bcbcce"
  }, {
    "url": "assets/3.html-CB77PEJH.js",
    "revision": "4d3dfdb0f93f1c7e265258e52315cc71"
  }, {
    "url": "assets/29.html-DO4iybKg.js",
    "revision": "f5c4f8613cc7955cc68a06db3c83bac1"
  }, {
    "url": "assets/28.html-CJ19CxAf.js",
    "revision": "89ac05e5092bf9def2205ed4e08e05ae"
  }, {
    "url": "assets/27.html-BcQE7mqL.js",
    "revision": "b0c0c1841f2eac560f6dbf2ebea94b1e"
  }, {
    "url": "assets/26.html-BM5cNSAp.js",
    "revision": "544422d45ec053378dee4e9173195298"
  }, {
    "url": "assets/25.html-BDepA2lx.js",
    "revision": "4af8565010949603fd62cdeb27526b10"
  }, {
    "url": "assets/24.html-CzXIJQPy.js",
    "revision": "e3b9f297c5717e13be885f009db989e8"
  }, {
    "url": "assets/23.html-BwOaXErL.js",
    "revision": "1ab7764153c695ffdfd151abe35a65fd"
  }, {
    "url": "assets/22.html-0MExZS0a.js",
    "revision": "ff86ffce9d2d07c607a487ba31e5a1a5"
  }, {
    "url": "assets/21.html-gdhBi_Ky.js",
    "revision": "c570e61a32b62ab0942f2381ff909ae5"
  }, {
    "url": "assets/2025.html-CYelRHYU.js",
    "revision": "9826171109c930f4acd68b69a44dca97"
  }, {
    "url": "assets/2024.html-BuvbzJ7F.js",
    "revision": "8586ebac0e7ab1fccd36479880f59f2a"
  }, {
    "url": "assets/20.html-D0vbMVLq.js",
    "revision": "551273ab8d3e2f9b2241e36db15b34f7"
  }, {
    "url": "assets/2.html-C3HRLaRm.js",
    "revision": "27a3f27c73a109970628403097884650"
  }, {
    "url": "assets/19.html-CWqlG20R.js",
    "revision": "8ce4bb4b077e82037503775736c966ad"
  }, {
    "url": "assets/18.html-ga_qtt6Q.js",
    "revision": "293e2eeba9e27696fa49bceac017956b"
  }, {
    "url": "assets/17.html-CdGE0dxy.js",
    "revision": "ce31539cde3f05c726ee0bb7367fd76d"
  }, {
    "url": "assets/16.html-DYI8f19Q.js",
    "revision": "317231ad0dddf38f135731b1c10b67e0"
  }, {
    "url": "assets/15.html-D0-Tq4Zk.js",
    "revision": "339f1b89a3540599a950eb76c9b514fe"
  }, {
    "url": "assets/14.html-Bg7S7GF4.js",
    "revision": "cf76c1c592e18b87f9a904117d1c5dd4"
  }, {
    "url": "assets/13.html-BHXHNO0_.js",
    "revision": "15b82464877e36eedeb5d66e24b31df0"
  }, {
    "url": "assets/12.html-CZELbHVz.js",
    "revision": "6716f3c1187a12c0f968dc7b3f515039"
  }, {
    "url": "assets/11.html-4S1WTtGL.js",
    "revision": "5c26550464f5f982f7b7d89ac19b3f41"
  }, {
    "url": "assets/10.html-mFyurXfn.js",
    "revision": "3bf5fea5a816c5dee613aa133d4202b6"
  }, {
    "url": "assets/1.html-DzQvjwB7.js",
    "revision": "b99e3f11d88dddabfa2c15b7e3a8e56c"
  }, {
    "url": "index.html",
    "revision": "1aa79f6e523fde6983fcae15347cb8e9"
  }, {
    "url": "404.html",
    "revision": "4de6184ff2cf6cb40e01d7196fdb1446"
  }], {});
  workbox.cleanupOutdatedCaches();

}));
