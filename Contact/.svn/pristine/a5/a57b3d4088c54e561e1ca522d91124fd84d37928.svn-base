/**
 * Created by edw on 2016/6/20.
 */
(function (angular) {
    'use strict';

    var moduleName = 'App.project';

    angular.module(moduleName).controller('projectContactController', [
        '$scope',
        '$timeout',
        'projectContactsDataService',
        'platformsLocalSessionStorageService',
        '$stateParams',
        'projectIconDataService',
        '$state',
        'commonSettingService',
        'contactDetailSummaryService',
        function ($scope,
                  $timeout,
                  projectContactsDataService,
                  platformsLocalSessionStorageService,
                  $stateParams,
                  projectIconDataService,
                  $state,
                  commonSettingService,
                  contactDetailSummaryService) {

            $scope.projectContactsData = [];
            $scope.projectIconData = [];
            $scope.options = "";
            $scope.imgOptions = {
                CompanyCode: '',
                OwnerId: ''
            };
            $scope.image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABPCAYAAABmraJtAAAKoWlDQ1BJQ0MgUHJvZmlsZQAASImVlwdQk9kWx+/3pTdaIBQpoTfpHaTX0KWDqIQEQigxBEKzK6KCa0FFBBRFV0AUXAsga0FEEWURUMC+IIuAsi4WREXlfcAjvPfm7bx5/5kz+c0/5zv3fDf3zpwAQL7D5POTYQkAUnjpgiBPF3pEZBQd9zuAABoQgBSQYLLS+M6Bgb7gb/WpD8lG9MBgttbf5/1XSbLj0lgAQIEIx7LTWCkIX0TiHIsvSAcAxUZ89cx0/izvQFhagDSIcNksc+b53CzHznPrXE5IkCvCjwDAk5lMAQcA0h+IT89gcZA6ZDTCxjw2l4ewOcIOrAQmsg4Z+Q4sTUlZM8vHENaJ/Zc6nH+rGSuqyWRyRDz/LnPCu3HT+MnM7P9zO/63UpKFC2uoIUFOEHgFza6H7FlV0hofEfNi/QMWmMue72mWE4ReoQvMSnONWmA2081ngYVJoc4LzBQsPstNZ4QssGBNkKh+XJp7sKh+HMNX1EOyv4jjuR6MBc5JCAlf4AxumP8CpyUF+yzmuIp8gTBI1HO8wEP0jilpi72xmIs9pCeEeC32FiHqgR3n5i7yeaGifH66i6gmPzlQlB+X7Cny0zKCRc+mIwdsgROZ3oGLdQJF+wO4wA8wASs9Lmv2XAHXNfxsAZeTkE53Rm5JHJ3BYxkupZsam1gAMHvn5n/SD7S5uwTR7i56qc0A2OQjJmfRY6oDcPkVANRPi576e+Q47AXgahdLKMiY92aPOsAAIhAH0kAeKAN1oAMMgCmwBHbACbgDbxAAQkAkWAVYIAGkAAHIBOvAZpAHCsBecBCUgHJwAlSBs+A8aABXwA1wG9wDXaAXPAUDYBi8ARPgE5iGIAgHUSAqJA+pQJqQPmQKWUMOkDvkCwVBkVAMxIF4kBBaB22FCqBCqAQ6DlVDv0CXoRtQO9QNPYYGoTHoPfQVRsFkWBpWgrVgI9gadoZ94BB4JcyBU+EcOBfeDRfDFfAZuB6+Ad+De+EB+A08iQIoEoqGUkUZoKxRrqgAVBQqHiVAbUDlo4pQFahaVBOqDfUANYAaR31BY9FUNB1tgLZDe6FD0Sx0KnoDehe6BF2Frke3oh+gB9ET6B8YCkYRo4+xxTAwERgOJhOThynCnMJcwtzC9GKGMZ+wWCwNq421wnphI7GJ2LXYXdgj2DpsM7YbO4SdxOFw8jh9nD0uAMfEpePycIdxZ3DXcT24YdxnPAmvgjfFe+Cj8Dz8FnwR/jT+Gr4HP4KfJkgQNAm2hAACm5BN2EM4SWgi3CcME6aJkkRtoj0xhJhI3EwsJtYSbxGfET+QSCQ1kg1pOYlL2kQqJp0j3SENkr6Qpch6ZFdyNFlI3k2uJDeTH5M/UCgULYoTJYqSTtlNqabcpLygfBajihmKMcTYYhvFSsXqxXrE3ooTxDXFncVXieeIF4lfEL8vPi5BkNCScJVgSmyQKJW4LNEvMSlJlTSRDJBMkdwleVqyXXJUCielJeUuxZbKlTohdVNqiIqiqlNdqSzqVupJ6i3qsDRWWluaIZ0oXSB9VrpTekJGSsZcJkwmS6ZU5qrMAA1F06IxaMm0PbTztD7aV1klWWfZONmdsrWyPbJTckvknOTi5PLl6uR65b7K0+Xd5ZPk98k3yD9XQCvoKSxXyFQ4qnBLYXyJ9BK7Jawl+UvOL3miCCvqKQYprlU8odihOKmkrOSpxFc6rHRTaVyZpuyknKh8QPma8pgKVcVBhatyQOW6ymu6DN2ZnkwvprfSJ1QVVb1UharHVTtVp9W01ULVtqjVqT1XJ6pbq8erH1BvUZ/QUNHw01inUaPxRJOgaa2ZoHlIs01zSktbK1xru1aD1qi2nDZDO0e7RvuZDkXHUSdVp0LnoS5W11o3SfeIbpcerGehl6BXqndfH9a31OfqH9HvXopZarOUt7Riab8B2cDZIMOgxmDQkGboa7jFsMHwrZGGUZTRPqM2ox/GFsbJxieNn5pImXibbDFpMnlvqmfKMi01fWhGMfMw22jWaPbOXN88zvyo+SMLqoWfxXaLFovvllaWAstayzErDasYqzKrfmtp60DrXdZ3bDA2LjYbba7YfLG1tE23PW/7l52BXZLdabvRZdrL4padXDZkr2bPtD9uP+BAd4hxOOYw4KjqyHSscHzppO7EdjrlNOKs65zofMb5rYuxi8DlksuUq63retdmN5Sbp1u+W6e7lHuoe4n7Cw81D45HjceEp4XnWs9mL4yXj9c+r36GEoPFqGZMeFt5r/du9SH7BPuU+Lz01fMV+Db5wX7efvv9nvlr+vP8GwJAACNgf8DzQO3A1MBfl2OXBy4vXf4qyCRoXVBbMDV4dfDp4E8hLiF7Qp6G6oQKQ1vCxMOiw6rDpsLdwgvDByKMItZH3ItUiORGNkbhosKiTkVNrnBfcXDFcLRFdF5030rtlVkr21cprEpedXW1+Grm6gsxmJjwmNMx35gBzArmZCwjtix2guXKOsR6w3ZiH2CPxdnHFcaNxNvHF8aPcuw5+zljCY4JRQnjXFduCfddoldieeJUUkBSZdJMcnhyXQo+JSblMk+Kl8RrXaO8JmtNN1+fn8cfSLVNPZg6IfARnEqD0lamNaZLI8NNh1BHuE04mOGQUZrxOTMs80KWZBYvqyNbL3tn9kiOR87Pa9FrWWtb1qmu27xucL3z+uMboA2xG1o2qm/M3Ti8yXNT1Wbi5qTNv20x3lK45ePW8K1NuUq5m3KHtnluq8kTyxPk9W+3216+A72Du6Nzp9nOwzt/5LPz7xYYFxQVfNvF2nX3J5Ofin+a2R2/u3OP5Z6je7F7eXv79jnuqyqULMwpHNrvt7/+AP1A/oGPB1cfbC8yLyo/RDwkPDRQ7FvceFjj8N7D30oSSnpLXUrryhTLdpZNHWEf6TnqdLS2XKm8oPzrMe6xR8c9j9dXaFUUncCeyDjx6mTYybafrX+uPqVwquDU90pe5UBVUFVrtVV19WnF03tq4BphzdiZ6DNdZ93ONtYa1B6vo9UVnAPnhOde/xLzS995n/MtF6wv1F7UvFh2iXopvx6qz66faEhoGGiMbOy+7H25pcmu6dKvhr9WXlG9UnpV5uqea8Rruddmrudcn2zmN4/f4NwYalnd8vRmxM2HrctbO2/53Lpz2+P2zTbntut37O9cabdtv3zX+m7DPct79R0WHZd+s/jtUqdlZ/19q/uNXTZdTd3Luq/1OPbceOD24PZDxsN7vf693X2hfY/6o/sHHrEfjT5OfvzuScaT6aebnmGe5T+XeF70QvFFxe+6v9cNWA5cHXQb7HgZ/PLpEGvozR9pf3wbzn1FeVU0ojJSPWo6emXMY6zr9YrXw2/4b6bH8/6U/LPsrc7bi385/dUxETEx/E7wbub9rg/yHyo/mn9smQycfPEp5dP0VP5n+c9VX6y/tH0N/zoynfkN9634u+73ph8+P57NpMzM8JkC5twogEICjo8H4H0lAJRIZHboAoAoNj8Tzwman+PnCPwdz8/Nc7IEoNIJgNBNAPgiM8pRJDQRJiOfsyNRiBOAzcxE8U+lxZuZztciI5Ml5vPMzAclAHBNAHwXzMxMH5mZ+X4SafYxAM2p87P4rLDIP5Rj5Flq11YG/6l/AEOO/4lt9uNFAAABm2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj45MjwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj43OTwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgqX7lIKAAAFZElEQVR4Ae2cXWxURRSAz+3u3u1uKWKtKIhQCxIqSpEQxcYECgHUiFFeTNAHE0gwpi+aGN9448kHHyWS+GRM1GgC/pTEWnyQ3wItsdRUQmkj0vIboJT+7J/nXHKbPtBd9s7MmVOck2x2s7t3zsw355575ueMt2bXSAGcsBGoYNPkFAUEHHBmQ3DAHXBmAszqnIU74MwEmNU5C3fAmQkwq3MW7oAzE2BW5yzcAWcmwKzOWbgDzkyAWZ2zcAecmQCzOmfhDjgzAWZ1cWZ9kdUlYgAPpT18AaR9D4ZHC3CTXncA8jNokVAs8AoPoGlpDF5YfPe1qBa/uIfk8gB/XczD8XM5ONSbg55/8QvB4klcRF7bEIP3N/hQ9+i9IRfjeeRsDj5vy8DZIZngRVl4DB/hu7YmYdNz6D8iyktPx2DNkhh81joB3x3LRizF3GViohQfu/7TbWqwQ0we3hgfvebD9nWJ8Csx72KAf/iqD2SdOmVHcwI2KtwtOusSliUC+LpnYvDmajPe7ZMtSZg3p/xnQQhI97t14BTukXWbkqokQMsmc+WXW2/rwMmy5842a4HNeActecx6U4O+sV6LVxrNuJKplkcP0c2Nep8PU8sv57NV4LNTAA3zearwIg6gJAhPa6dpaU2VB2R9HFJbbbWpk020WosYo9HRoEqCWK3G1WG+WSdOXcU61ipwmukbnShWPX2/Dd2QMbdiFTjhvHSTx8qHmPSUMhHrwAeZLG/wBk/Higd+/TYPCC494oHXM40A6+cyxZ8liFt1KTQlu2weTxVWLGSMQYtA52ntNBWoruQb+NB6qASxCvwa+u9bozwYzl92YWFAumsgx0K8s59HT6nGWLVwqlwHrrZzSEcfj55SbbEO/GBPDjKGWZy7VIC+yzzhp3jg5Mfbz5gl/u3RTCkObL9bt3Bq6U+d5oCMYdFt3XK2S4gAfqIvD6bmOn5Hl3WHaYLsfm4TEcCpoof/NuNW/uiVY93UTjHATYVtnQMy4m+CTSIGeJcBMP9cK4CUSau7uAUBpxWZgat6Q7cT5824qRBelHcxFk6V/+aIvmiF9oxLCgfDzhEF/MfOrLZo5bfuHPRf0XvHhNBU3kUBz6IH2NuubuU0cv2iXVAsOKWHRAGnev3SlVXOYiBXcuG6POum9okDTpU6cFotdm7FTpMqIoGrpIuQO+nXHO3o7DyRwEfGozeRngOUaCVVRAJPKWSK0DqpZBEJvArXOqMK7SGcVRn1avPXiQReWx0dOCFbUCOyWUFviqzZhuVqWxoo40GqiPJ4jQsr4APMx1nxpJodvPtyAp5AK//+WAakzRZaz0R+ZJYHlHayZVUcpkvvVrFWGgD9jFMGrRjbc20cLVZfK8Ap1WT98jhsfDYOK+sqgPLqTUsBB56n+vNAg6KDPVlrq0BswCm1pAkTXylrjRJgbWYk0J70X//Mwg8dWegd5A3ajQN/uArgjVWJAPTjghJUwzvqzIV8AJ4WmicYZgSMAX8KT4J4b60P6zFiiMsNGkLuwZa7/Scz8NWhTHAGy+QPmj9oB76gxoMdzX6Q487hmzXzCHw7LYR8fTgDt8d0lw6gDXgSA8yWzT68hT7apn/WhWgYYe9pmwjcja4yqRwtwOvwtJ7db1eClE3vOgHRvpbd+8a1WbvaCANbRi7ky52pBxI2dRyddLFne0rbc0gZ+Mev+5CSc1iDTuOeLGsxpqu806QwhTlZkuKKD8XWq+tnQAgypcFRPz6PAzQdolTKHDzSbiZGIlHApZN6hsNKwKXkzUQBWO41IoAn43p6vdzG2/h/WtNzSsnCH4R4+347j04D1SFKwOm8qv+LpPHsLB3yH70bVs5EycTeAAAAAElFTkSuQmCC';
            $scope.imageData = "";

            $scope.skipCancel = function () {
                $scope.options = ""
                $scope.myfunc();
            }

            $scope.loadProjectContactData = function (id) {
                projectContactsDataService.getContacts(id).then(function (data) {
                    $scope.projectContactsData = [];
                    $scope.projectContactName = $stateParams.data.name;
                    if (data.length == 0) {
                        //   $scope.projectContactsData=[{FirstName:'Edwin',FamilyName:"xu",imageData:$scope.image}];
                        $('#projectContact ion-content.contactproject').addClass("add");
                        $timeout(function () {
                            $('#projectContact ion-content.contactproject').html('<p >No Data</p>');
                        }, 100)
                    }
                    else if (data.length > 0) {
                        $scope.projectContactsData = data;
                    }
                    /*else if( data.Main.length==1&&(data.Main.FamilyName==null ||data.Main.FirstName==null )){
                     $('#projectContact ion-content.contactproject').addClass("add");
                     $timeout(function(){
                     $('#projectContact ion-content.contactproject').html('<p >No Data</p>');
                     },100)
                     }else {
                     var temp= angular.copy( data.Main);
                     temp.map(function(item,index ){
                     if( $scope.LoadProjectIconData(item.BusinessPartnerFk)==null){
                     var   imageData= $scope.image;
                     }
                     return item.imageData= imageData ;
                     } );
                     $scope.projectContactsData=temp;
                     }*/
                }, function () {
                    $scope.moreProject = false;
                });

            };

            $scope.myfunc = function (item) {
                if ($scope.options == "") {
                    return true;
                }
                if (item.firstName.toLocaleLowerCase().indexOf($scope.options.toLocaleLowerCase()) >= 0 ||
                    item.familyName.toLocaleLowerCase().indexOf($scope.options.toLocaleLowerCase()) >= 0) {
                    return true;
                } else {
                    return false;
                }
            }

            $scope.LoadProjectIconData = function (id) {
                $scope.imageData = "";
                $scope.imgOptions.CompanyCode = JSON.parse(localStorage.getItem("companyName")).code;
                $scope.imgOptions.OwnerId = id;
                projectIconDataService.getIcons($scope.imgOptions).then(function (data) {
                    if (data && data.photo) {
                        // $scope.photos=data;
                        $scope.imageData = 'data:image/png;base64,' + data.photo;
                    } else {
                        $scope.imageData = 'data:image/png;base64,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';

                    }
                }, function () {
                });
            };
            function getContactDetail(contact) {
                var options = {};
                options.Id = contact.id;
                options.CompanyCode = JSON.parse(localStorage.getItem("companyName")).code;
                contactDetailSummaryService.getContactDetail(options).then(function (response) {
                    //debugger;

                    /*   var Name=pjcontact.firstName+" " +pjcontact.familyName;
                     var Id=pjcontact.Id;
                     var Title=pjcontact.Title;
                     var Initials=pjcontact.initials;
                     var Email=pjcontact.email;
                     var MobilePattern=pjcontact.mobilePattern;
                     var TelephonePattern =pjcontact.telephonePattern;
                     var Telephone2Pattern=pjcontact.telephone2Pattern;
                     var TelefaxPattern=pjcontact.telefaxPattern;
                     var Internet=pjcontact.internet;
                     var AddressDescriptor=pjcontact.AddressDescriptor==null?null:pjcontact.AddressDescriptor.Address;*/
                    var pjcontact = response.basicInfo;
                    var datamessage = {};
                    datamessage.Name = pjcontact.firstName + " " + pjcontact.familyName;
                    datamessage.Id = pjcontact.id;
                    datamessage.Title = contact.roleDescription;
                    datamessage.Initials = pjcontact.initials;
                    datamessage.Email = pjcontact.email;
                    datamessage.MobilePattern = response.mobile ? response.mobile.pattern : '';
                    datamessage.TelephonePattern = response.telephone ? response.telephone.pattern : '';
                    datamessage.Telephone2Pattern = response.telephone2 ? response.telephone2.pattern : '';
                    datamessage.TelefaxPattern = response.teleFax  ? response.teleFax.pattern : '';
                    datamessage.Internet = pjcontact.internet;
                    datamessage.AddressDescriptor = pjcontact.addressLine == null ? null : pjcontact.addressLine;
                    datamessage.imageData = pjcontact.imageData;

                    datamessage.imageData = 'data:image/png;base64,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';
                    $scope.LoadProjectIconData(pjcontact.id);

                    $timeout(function () {
                        if ($scope.imageData) {
                            datamessage.imageData = $scope.imageData;
                        }
                        $state.go('desktop.projectusermessage', {data: datamessage});
                    }, 100);

                }, function (error) {
                    $scope.hideLoading();
                    console.log(error);
                });
            }

            $scope.contactskip = function (pjcontact) {
                //debugger;
                getContactDetail(pjcontact);
            };

            $scope.testbpId = function () {
                $scope.bpid = $stateParams.data.bqid;
                if ($scope.bpid == "" || $scope.bpid == null) {
                    $scope.projectContactName = $stateParams.data.name;
                    $scope.projectContactsData = null;
                    $('#projectContact ion-content.contactproject').addClass("add");
                    $timeout(function () {
                        $('#projectContact ion-content.contactproject').html('<p>No Data</p>');
                    }, 100)
                    //  $scope.projectContactsData=[{FirstName:'Edwin',FamilyName:"xu",imageData:$scope.image}];

                } else {
                    $scope.loadProjectContactData($scope.bpid);
                }
            };

            function init() {
                //     commonSettingService.getService($scope);
                $scope.testbpId();
            }

            init();

        }])

})(angular);