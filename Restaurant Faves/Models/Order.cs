using System;
using System.Collections.Generic;

namespace Restaurant_Faves.Models;

public partial class Order
{
    public int Id { get; set; }

    public string? OrderDescription { get; set; }

    public string? Restaurant { get; set; }

    public int? Rating { get; set; }

    public bool? OrderAgain { get; set; }
}
