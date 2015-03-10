/**
 * Created by dminhquan on 3/4/2015.
 */
'use strict';

describe('Unit: Testing Service', function () {

  beforeEach(module('myAppApp'));

  it('should contain an AllMusicManagerAppIds constant',
    inject(function (AllMusicManagerAppIds) {
      expect(AllMusicManagerAppIds).not.toBe(null);
    }));

  it('should contain an $layoutService service',
    inject(function ($layoutService) {
      expect($layoutService).not.toBe(null);
    }));

  it('should have a working $layoutService service',
    inject(['$layoutService', function ($yt) {
      expect($yt.sideBarList).not.toBe(null);
      expect($yt.findSideBarItem).not.toBe(null);
    }]));
});
