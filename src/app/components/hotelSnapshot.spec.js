describe('Component: Calendar Analysis', function() {
    var mockPermissionService,
        mockUserService,
        mockScope;

    beforeEach(function() {
        mockPermissionService = {
            canViewPage: jasmine.createSpy('mockPermissionService.canViewPage').and.returnValue(true)
        };
        mockUserService = {
            getPoEnabled: jasmine.createSpy('mockUserService.getPoEnabled').and.returnValue(true)
        };
        mockScope = {
            $on: jasmine.createSpy('mockScope.$on')
        };
    });

    beforeEach(module('rmsv2.home', function($provide) {
        $provide.value('PermissionService', mockPermissionService);
        $provide.value('UserService', mockUserService);
    }));

    describe('Controller', function() {
        var $componentController,
            ctrl;

        beforeEach(inject(function(_$componentController_) {
            $componentController = _$componentController_;
        }));

        beforeEach(function() {
            var locals = {
                $scope: mockScope
            };
            ctrl = $componentController('calendarAnalysis', locals);
        });

        describe('#$onInit()', function() {
            var removeUpdateMenuListener;

            beforeEach(function() {
                removeUpdateMenuListener = 'listener';
                mockScope.$on = jasmine.createSpy('mockScope.$on').and.returnValue(removeUpdateMenuListener);
                ctrl._initTabPermissions = jasmine.createSpy('_initTabPermissions');
            });

            it('calls init tab permissions', function() {
                ctrl.$onInit();

                expect(ctrl._initTabPermissions).toHaveBeenCalled();
            });

            it('adds an event listener for updateMenu', function() {
                ctrl.$onInit();

                expect(mockScope.$on).toHaveBeenCalledWith('updateMenu', ctrl._initTabPermissions);
                expect(ctrl._removeUpdateMenuListener).toBe(removeUpdateMenuListener);
            });
        });

        describe('#_initTabPermissions()', function() {
            describe('demand tab', function() {
                it('sets permission to TRUE when user can view the demand page', function() {
                    mockPermissionService.canViewPage = jasmine.createSpy('mockPermissionService.canViewPage').and.callFake(function(page) {
                        return page === 'demand';
                    });

                    ctrl._initTabPermissions();

                    expect(mockPermissionService.canViewPage).toHaveBeenCalled();
                    expect(ctrl.tabPermissions[ctrl.tabHint.demand.title]).toBe(true);
                });

                it('sets permission to FALSE when user can NOT view the demand page', function() {
                    mockPermissionService.canViewPage = jasmine.createSpy('mockPermissionService.canViewPage').and.callFake(function(page) {
                        return page !== 'demand';
                    });

                    ctrl._initTabPermissions();

                    expect(mockPermissionService.canViewPage).toHaveBeenCalled();
                    expect(ctrl.tabPermissions[ctrl.tabHint.demand.title]).toBe(false);
                });
            });

            describe('inventory tab', function() {
                it('sets permission to TRUE no matter what', function() {
                    mockPermissionService.canViewPage = jasmine.createSpy('mockPermissionService.canViewPage').and.returnValue(false);
                    mockUserService.getPoEnabled = jasmine.createSpy('mockUserService.getPoEnabled').and.returnValue(false);

                    ctrl._initTabPermissions();

                    expect(ctrl.tabPermissions[ctrl.tabHint.inventory.title]).toBe(true);
                });
            });

            describe('pricing tab', function() {
                it('sets permission to TRUE when user can view optimize price page and PO is enabled', function() {
                    mockPermissionService.canViewPage = jasmine.createSpy('mockPermissionService.canViewPage').and.callFake(function(page) {
                        return page === 'optimize-price';
                    });
                    mockUserService.getPoEnabled = jasmine.createSpy('mockUserService.getPoEnabled').and.returnValue(true);

                    ctrl._initTabPermissions();

                    expect(ctrl.tabPermissions[ctrl.tabHint.pricing.title]).toBe(true);
                });

                it('sets permission to FALSE when user can NOT view optimize price page and PO is enabled', function() {
                    mockPermissionService.canViewPage = jasmine.createSpy('mockPermissionService.canViewPage').and.callFake(function(page) {
                        return page !== 'optimize-price';
                    });
                    mockUserService.getPoEnabled = jasmine.createSpy('mockUserService.getPoEnabled').and.returnValue(true);

                    ctrl._initTabPermissions();

                    expect(ctrl.tabPermissions[ctrl.tabHint.pricing.title]).toBe(false);
                });

                it('sets permission to FALSE when user can view optimize price page and PO is NOT enabled', function() {
                    mockPermissionService.canViewPage = jasmine.createSpy('mockPermissionService.canViewPage').and.callFake(function(page) {
                        return page === 'optimize-price';
                    });
                    mockUserService.getPoEnabled = jasmine.createSpy('mockUserService.getPoEnabled').and.returnValue(false);

                    ctrl._initTabPermissions();

                    expect(ctrl.tabPermissions[ctrl.tabHint.pricing.title]).toBe(false);
                });

                it('sets permission to FALSE when user can NOT view optimize price page and PO is NOT enabled', function() {
                    mockPermissionService.canViewPage = jasmine.createSpy('mockPermissionService.canViewPage').and.callFake(function(page) {
                        return page !== 'optimize-price';
                    });
                    mockUserService.getPoEnabled = jasmine.createSpy('mockUserService.getPoEnabled').and.returnValue(false);

                    ctrl._initTabPermissions();

                    expect(ctrl.tabPermissions[ctrl.tabHint.pricing.title]).toBe(false);
                });
            });

            describe('yielding tab', function() {
                it('sets permission to TRUE when user can view the HP page', function() {
                    mockPermissionService.canViewPage = jasmine.createSpy('mockPermissionService.canViewPage').and.callFake(function(page) {
                        return page === 'hurdle-point-restrictions';
                    });

                    ctrl._initTabPermissions();

                    expect(mockPermissionService.canViewPage).toHaveBeenCalled();
                    expect(ctrl.tabPermissions[ctrl.tabHint.yielding.title]).toBe(true);
                });

                it('sets permission to FALSE when user can NOT view the HP page', function() {
                    mockPermissionService.canViewPage = jasmine.createSpy('mockPermissionService.canViewPage').and.callFake(function(page) {
                        return page !== 'hurdle-point-restrictions';
                    });

                    ctrl._initTabPermissions();

                    expect(mockPermissionService.canViewPage).toHaveBeenCalled();
                    expect(ctrl.tabPermissions[ctrl.tabHint.yielding.title]).toBe(false);
                });
            });
        });

        describe('#displayGraphPanel()', function() {
            it('sets the displayGraph value to TRUE', function() {

                ctrl.displayGraphPanel();

                expect(ctrl.displayGraph).toEqual(true);
            });
        });

        describe('#displayGridPanel()', function() {
            it('sets the displayGraph value to FALSE', function() {

                ctrl.displayGridPanel();

                expect(ctrl.displayGraph).toEqual(false);
            });
        });

        describe('#$onDestroy()', function() {
            it('does not throw when the updateMenu listener is null', function() {
                ctrl._removeUpdateMenuListener = null;

                expect(ctrl.$onDestroy).not.toThrow();
            });

            it('removes the updateMenu listener', function() {
                ctrl._removeUpdateMenuListener = jasmine.createSpy('_removeUpdateMenuListener');

                ctrl.$onDestroy();

                expect(ctrl._removeUpdateMenuListener).toHaveBeenCalled();
            });
        });
    });
});