from pint import UnitRegistry

ureg = UnitRegistry()

def Converter(request_type, target, data_int_float):
    if request_type == "length":
        lst_length = ['cm', 'km', 'm', 'mm', 'mile', 'yard', 'foot', 'inch']
        lst_length.remove(target)
        data_int_float = data_int_float * ureg['cm']
        for lh in lst_length:
            lst = []
            lst.append(data_int_float.to(lh).magnitude)
    elif request_type == "weigth":
        lst_weigth = ['kg', 'g', 'mg', 'ton', 'pound', 'ounce']
        lst_weigth.remove(target)
        data_int_float = data_int_float * ureg['cm']
        for wh in lst_weigth:
            lst = []
            lst.append(data_int_float.to(wh).magnitude)
