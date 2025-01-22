from pint import UnitRegistry

ureg = UnitRegistry()


class Converter:
    def __init__(self, request_type, target, data_int_float):
        self.request_type = request_type
        self.target = target
        self.data_int_float = data_int_float

    def convert(self):
        print('Inside Converter - request_type:', self.request_type, 'target:', self.target, 'data_int_float:',
              self.data_int_float)
        if self.request_type == "Длина":
            lst_length = ['cm', 'km', 'm', 'mm', 'mile', 'yard', 'foot', 'inch']
            lst_length.remove(self.target)
            initial_value = self.data_int_float * ureg[self.target]  # Умножаем на верную единицу
            lst = []
            for lh in lst_length:
                converted_value = initial_value.to(lh)
                lst.append(f"{converted_value.magnitude:.2f} {converted_value.units}")
            print(lst)
            return ", ".join(lst)
        elif self.request_type == "Масса":
            lst_weigth = ['kg', 'g', 'mg', 't', 'pound', 'ounce']
            lst_weigth.remove(self.target)
            initial_value = self.data_int_float * ureg[self.target]  # Умножаем на верную единицу
            lst = []
            for wh in lst_weigth:
                converted_value = initial_value.to(wh)
                lst.append(f"{converted_value.magnitude:.2f} {converted_value.units}")
            print(lst)
            return ", ".join(lst)
        else:
            raise ValueError(f"Unknown request_type: {self.request_type}")

